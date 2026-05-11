"use client";

import { motion } from "framer-motion";
import { Server, Brain, ShieldCheck } from "lucide-react";

export default function About() {
  const skills = [
    {
      icon: <Server className="text-primary mb-4" size={32} />,
      title: "Private AI Cloud",
      desc: "Architecting resilient offline infrastructure using Kubernetes (RKE2), Docker, and MinIO."
    },
    {
      icon: <Brain className="text-accent mb-4" size={32} />,
      title: "MLOps & Agents",
      desc: "Deploying production-grade ML pipelines and agentic workflows with KubeRay and MLflow."
    },
    {
      icon: <ShieldCheck className="text-primary mb-4" size={32} />,
      title: "Full Stack Engineering",
      desc: "Building scalable backend services in Flask and cross-platform mobile apps with React Native."
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10 border-t border-white/5 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            I build intelligent, offline-resilient architectures that bring AI capabilities to edge environments and secure private clouds.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
            >
              {skill.icon}
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-white/50">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
