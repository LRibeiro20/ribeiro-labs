"use client";

import { motion } from "framer-motion";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { useLiveAPI } from "@/hooks/useLiveAPI";

const AudioWaves = () => (
  <div className="flex items-center gap-[2px] h-4 w-6">
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="w-1 bg-green-400 rounded-full"
        animate={{ height: ["30%", "100%", "40%", "90%", "30%"] }}
        transition={{
          duration: 0.8 + (i * 0.2),
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export default function VoiceButton() {
  const { isConnected, isProcessing, transcript, toggleListen } = useLiveAPI();

  return (
    <div className="flex items-center gap-3">
      {(isConnected || isProcessing) && (
        <div className="bg-black/80 text-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-mono flex items-center gap-3 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap shadow-lg">
          {isProcessing ? (
            <><Loader2 size={16} className="animate-spin text-accent" /> <span className="opacity-80">Connecting...</span></>
          ) : (
            <>
              <AudioWaves /> 
              <span className="truncate flex-1">{transcript || "Listening to you..."}</span>
            </>
          )}
        </div>
      )}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleListen}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors border ${
          isConnected 
            ? "bg-green-500/20 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
            : "bg-black text-white border-white/20 hover:bg-white/10"
        }`}
      >
        {isConnected ? <MicOff size={24} /> : <Mic size={24} />}
      </motion.button>
    </div>
  );
}
