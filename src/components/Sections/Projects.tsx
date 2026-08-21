"use client";

import { motion } from "framer-motion";
import GlowingCard from "../UI/GlowingCard";
import { FolderGit2 } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Voya",
      description: "An urban mobility and ride-hailing platform featuring an offline-resilient architecture, powered by a Flask backend and React Native (Expo) mobile applications.",
      tags: ["Flask", "React Native", "Offline-Resilient"]
    },
    {
      title: "IdentityX Integration",
      description: "A document validation platform for financial services, featuring advanced injection attack prevention and photo substitution detection.",
      tags: ["Computer Vision", "Security", "Fintech"]
    },
    {
      title: "Enterprise Agentic Workflows",
      description: "Development of intelligent, agentic AI systems integrated into business dashboards and automated workflows.",
      tags: ["Agentic AI", "LLMs", "Automation"]
    }
  ];

  return (
    <section id="projects" className="py-24 relative z-10 bg-[#030712]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
          <p className="text-white/60 text-lg">
            Deploying state-of-the-art AI systems into real-world applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <GlowingCard className="h-full">
                <FolderGit2 className="text-accent mb-6" size={32} />
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-white/60 mb-8 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
