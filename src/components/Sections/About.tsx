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
          <h2 className="text-3xl md:text-5xl font-bold mb-8">About Me</h2>
          <div className="text-white/70 max-w-4xl mx-auto text-lg space-y-6 text-left">
            <p>
              I build and scale end-to-end AI systems that move beyond experimentation into real-world, high-reliability production environments. My work focuses on architecting intelligent systems powered by large language models, retrieval-augmented generation (RAG), and agentic workflows, with strong emphasis on performance, observability, and cost-efficient scaling.
            </p>
            <p>
              I have deep experience engineering backend systems in Python (FastAPI/Flask), designing cloud-native architectures on GCP, and delivering robust cross-platform applications using React Native (Expo). My engineering approach prioritizes system design, scalability, and reliability over isolated model experimentation.
            </p>
            <p>
              My core expertise includes LLM integration, AI orchestration, retrieval systems, vector search, and production AI infrastructure. I specialize in identifying and solving bottlenecks across AI pipelines—from retrieval quality and latency optimization to prompt and context engineering.
            </p>
            <p>
              I operate at the intersection of software engineering and applied AI, building systems that transform state-of-the-art AI capabilities into dependable, production-ready products at scale.
            </p>
          </div>
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
