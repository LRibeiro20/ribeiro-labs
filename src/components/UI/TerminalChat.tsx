"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Terminal as TerminalIcon } from "lucide-react";
import { useAgenticNavigator } from "@/hooks/useAgenticNavigator";

export default function TerminalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: "assistant", content: "Initializing Agentic Session...\nReady. Ask me about Luis's experience, or where to go." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { processAction } = useAgenticNavigator();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: messages.map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })) })
      });
      const data = await res.json();
      
      let replyText = data.reply || "Error fetching response.";
      
      // Extract json block for agentic action
      const jsonMatch = replyText.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        processAction(jsonMatch[1]);
        // Remove the json block from visible chat
        replyText = replyText.replace(/```json\n[\s\S]*?\n```/, "").trim();
      }

      setMessages(prev => [...prev, { role: "assistant", content: replyText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection to Agent failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 h-[500px] bg-black/90 border border-white/20 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl font-mono text-sm"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2 text-white/80">
                <TerminalIcon size={16} />
                <span>agent@luis-portfolio:~</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <span className={`text-xs mb-1 ${msg.role === "user" ? "text-primary" : "text-accent"}`}>
                    {msg.role === "user" ? "user@guest" : "agent@sys"}
                  </span>
                  <div className={`px-3 py-2 rounded-lg max-w-[85%] whitespace-pre-wrap ${msg.role === "user" ? "bg-primary/20 text-white" : "bg-white/10 text-white/90"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-col items-start">
                  <span className="text-xs mb-1 text-accent">agent@sys</span>
                  <div className="px-3 py-2 rounded-lg bg-white/10 text-white/50 animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 bg-white/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30"
              />
              <button 
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="text-white/50 hover:text-white disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors"
        >
          <MessageSquare size={24} />
        </motion.button>
      )}
    </>
  );
}
