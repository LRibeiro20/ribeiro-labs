"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import GlowingCard from "../UI/GlowingCard";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative z-10 border-t border-white/5 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's Connect</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Whether you have a question, a project idea, or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <GlowingCard className="flex flex-col items-center justify-center p-8">
            <Mail className="text-accent mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <a href="mailto:luluribas105@gmail.com" className="text-white/60 hover:text-white transition-colors text-sm">
              luluribas105@gmail.com
            </a>
          </GlowingCard>

          <GlowingCard className="flex flex-col items-center justify-center p-8">
            <FaLinkedin className="text-[#0a66c2] mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
            <a href="https://www.linkedin.com/in/luis-ribeiro-engineer/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors text-sm">
              in/luis-ribeiro-engineer
            </a>
          </GlowingCard>

          <GlowingCard className="flex flex-col items-center justify-center p-8">
            <FaGithub className="text-white mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">GitHub</h3>
            <a href="https://github.com/LRibeiro20" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors text-sm">
              github.com/LRibeiro20
            </a>
          </GlowingCard>
        </motion.div>
      </div>
    </section>
  );
}
