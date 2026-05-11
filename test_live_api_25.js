const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const apiKey = env.match(/GEMINI_API_KEY=(.*)/)[1].trim();

const { GoogleGenAI } = require('@google/genai');
async function m() { 
  const ai = new GoogleGenAI({ apiKey }); 
  const s = await ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-latest',
    config: { 
      systemInstruction: { parts: [{ text: "You are an AI." }] }
    }, 
    callbacks: { 
      onopen: () => console.log('OPEN'), 
      onerror: e => console.log('ERROR:', e), 
      onclose: e => console.log('CLOSE:', e.reason, e.code), 
      onmessage: m => console.log('MSG:', JSON.stringify(m)) 
    } 
  }); 
} 
m();
