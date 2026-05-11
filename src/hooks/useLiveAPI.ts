"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { useAgenticNavigator } from "./useAgenticNavigator";

// Buffer threshold: accumulate 2048 samples before sending (~128ms at 16kHz).
// This prevents flooding the WebSocket with 125 tiny packets/sec.
const BUFFER_THRESHOLD = 2048;

export function useLiveAPI() {
  const [isConnected, setIsConnected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<AudioWorkletNode | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const inputBufferRef = useRef<Float32Array>(new Float32Array(0));
  const { processAction } = useAgenticNavigator();

  // --- PLAYBACK: Little-Endian enforced ---
  const playAudioChunk = useCallback((base64Data: string) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    // Resume context if suspended (belt-and-suspenders for browser policy)
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    
    try {
      // Decode base64 to raw bytes
      const binaryStr = window.atob(base64Data);
      const rawBuffer = new ArrayBuffer(binaryStr.length);
      const rawView = new Uint8Array(rawBuffer);
      for (let i = 0; i < binaryStr.length; i++) {
        rawView[i] = binaryStr.charCodeAt(i);
      }
      
      // Read PCM16 samples using DataView with explicit Little-Endian
      const dataView = new DataView(rawBuffer);
      const numSamples = rawBuffer.byteLength / 2;
      const float32 = new Float32Array(numSamples);
      for (let i = 0; i < numSamples; i++) {
        const sample = dataView.getInt16(i * 2, true); // true = Little-Endian
        float32[i] = sample / 32768;
      }
      
      // Schedule gapless playback at 24kHz (Gemini output rate)
      const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      if (nextPlayTimeRef.current < ctx.currentTime) {
        nextPlayTimeRef.current = ctx.currentTime;
      }
      source.start(nextPlayTimeRef.current);
      nextPlayTimeRef.current += audioBuffer.duration;
    } catch (e) {
      console.error("Audio playback error", e);
    }
  }, []);

  // --- CAPTURE: Buffered to 2048 samples before sending ---
  const startAudioCapture = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const ctx = audioContextRef.current!;
      // Resume the context we created synchronously in connect()
      if (ctx.state === "suspended") {
        await ctx.resume();
      }
      nextPlayTimeRef.current = 0;

      const source = ctx.createMediaStreamSource(streamRef.current);
      
      // Inline AudioWorkletProcessor via Blob URL
      const workletCode = `
        class PCMProcessor extends AudioWorkletProcessor {
          process(inputs, outputs, parameters) {
            const input = inputs[0];
            if (input && input.length > 0) {
              const channelData = input[0];
              this.port.postMessage(channelData);
            }
            return true;
          }
        }
        registerProcessor('pcm-processor', PCMProcessor);
      `;
      const blob = new Blob([workletCode], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      
      await ctx.audioWorklet.addModule(url);
      URL.revokeObjectURL(url);

      const workletNode = new AudioWorkletNode(ctx, 'pcm-processor');
      processorRef.current = workletNode;
      
      // Reset the input buffer
      inputBufferRef.current = new Float32Array(0);

      workletNode.port.onmessage = (e) => {
        if (!sessionRef.current) return;

        const incoming = e.data as Float32Array;
        
        // Append incoming samples to our buffer
        const prev = inputBufferRef.current;
        const merged = new Float32Array(prev.length + incoming.length);
        merged.set(prev);
        merged.set(incoming, prev.length);
        inputBufferRef.current = merged;

        // Only send when we've accumulated enough samples
        if (inputBufferRef.current.length >= BUFFER_THRESHOLD) {
          const toSend = inputBufferRef.current;
          inputBufferRef.current = new Float32Array(0);

          // Convert float32 -> PCM16 Little-Endian
          const pcmBuffer = new ArrayBuffer(toSend.length * 2);
          const pcmView = new DataView(pcmBuffer);
          for (let i = 0; i < toSend.length; i++) {
            const s = Math.max(-1, Math.min(1, toSend[i]));
            const val = s < 0 ? s * 0x8000 : s * 0x7FFF;
            pcmView.setInt16(i * 2, val, true); // true = Little-Endian
          }
          
          // Base64 encode
          const bytes = new Uint8Array(pcmBuffer);
          let binary = '';
          for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          const base64Data = window.btoa(binary);

          sessionRef.current.sendRealtimeInput({
            audio: { data: base64Data, mimeType: "audio/pcm;rate=16000" }
          });
        }
      };
      
      source.connect(workletNode);
      // Don't connect workletNode to destination — we don't want to hear ourselves
      
    } catch(e) {
      console.error("Microphone access denied or error capturing audio", e);
    }
  };

  const stopAudioCapture = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    // Don't close AudioContext here — disconnect() handles it
  };

  const connect = useCallback(async () => {
    try {
      setIsProcessing(true);

      // FIX: Create AudioContext SYNCHRONOUSLY during user gesture (button click).
      // This captures the browser's "user activation" token, preventing
      // the context from being permanently suspended.
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });

      const res = await fetch("/api/config");
      const { apiKey } = await res.json();
      if (!apiKey) throw new Error("Missing API Key");

      const ai = new GoogleGenAI({ apiKey });

      const config = { 
        responseModalities: ["AUDIO"],
        systemInstruction: { parts: [{ text: "You are Luis Ribeiro's AI assistant on his portfolio website. Talk about what Luis can do, his specialization, expertise, projects, and experience. Refer to him as 'Luis' or 'he'. Be concise, enthusiastic, and professional." }] }
      };

      sessionRef.current = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: config as any,
        callbacks: {
          onopen: () => {
            console.log("Live API Connected");
            setIsConnected(true);
            setIsProcessing(false);
            startAudioCapture();

            // FIX: Inject an initial greeting so the AI speaks first.
            // Without this, the Live API waits for human speech before responding.
            setTimeout(() => {
              if (sessionRef.current) {
                sessionRef.current.sendClientContent({
                  turns: [{ role: "user", parts: [{ text: "Hello! Introduce yourself briefly." }] }]
                });
              }
            }, 500);
          },
          onmessage: (message: any) => {
            if (message?.serverContent?.modelTurn?.parts) {
              const parts = message.serverContent.modelTurn.parts;
              for (const p of parts) {
                if (p.text) {
                  setTranscript(prev => prev + p.text);
                  const jsonMatch = p.text.match(/```json\n([\s\S]*?)\n```/);
                  if (jsonMatch) processAction(jsonMatch[1]);
                }
                if (p.inlineData && p.inlineData.mimeType.startsWith("audio/pcm")) {
                  playAudioChunk(p.inlineData.data);
                }
              }
            }
          },
          onerror: (e: any) => {
            console.error("Live API Error:", e);
          },
          onclose: (e: any) => {
            console.log("Live API Disconnected. Code:", e?.code, "Reason:", e?.reason);
            disconnect();
          }
        }
      });
      
    } catch (error) {
      console.error("Failed to connect to Live API", error);
      // Clean up AudioContext if connection failed
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsProcessing(false);
    }
  }, [processAction, playAudioChunk]);

  const disconnect = useCallback(() => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    stopAudioCapture();
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsConnected(false);
    setIsProcessing(false);
    setTranscript("");
  }, []);

  const toggleListen = useCallback(() => {
    if (isConnected) disconnect();
    else connect();
  }, [isConnected, connect, disconnect]);

  const sendText = (text: string) => {
    if (sessionRef.current) {
      sessionRef.current.sendClientContent({ turns: [{ role: "user", parts: [{ text }] }] });
      setTranscript(prev => prev + "\nUser: " + text + "\nAI: ");
    }
  };

  return {
    isConnected,
    isProcessing,
    transcript,
    toggleListen,
    sendText
  };
}
