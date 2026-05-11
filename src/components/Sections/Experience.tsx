"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      company: "Transdigital",
      role: "Software Engineer",
      period: "Jun 2024 – Present",
      location: "Maputo, Mozambique",
      description: [
        "Architect and maintain scalable backend systems using Flask, focusing on secure authentication, messaging, and document workflows.",
        "Build AI-powered Retrieval-Augmented Generation (RAG) pipelines using Google Vertex AI.",
        "Design and deploy cloud-native, event-driven architectures with Cloud Run, Cloud Scheduler, and GCS.",
        "Automate CI/CD with GitHub Actions, deploying containerized microservices to Google Cloud."
      ]
    },
    {
      company: "BoleiaChain",
      role: "Mobile Application Developer",
      period: "Jun 2024 – Nov 2024",
      location: "Maputo, Mozambique",
      description: [
        "Developed high-performance React Native mobile applications with a strong focus on scalability and maintainability.",
        "Integrated AI-driven features that increased user engagement by ~20%.",
        "Delivered stable releases with 98% test coverage, supporting rapid iteration."
      ]
    },
    {
      company: "Transdigital, Lda",
      role: "Software Developer",
      period: "May 2023 – Feb 2024",
      location: "Maputo, Mozambique",
      description: [
        "Built and deployed AI-based chatbot solutions for 5 enterprise clients, achieving 98% model accuracy and 95% client satisfaction.",
        "Optimized ML models, reducing error rates by ~50% through continuous training and tuning.",
        "Led integration of a recommendation system, improving client productivity by ~25%."
      ]
    },
    {
      company: "Upgrade Consultorias, Lda",
      role: "Frontend Developer",
      period: "Apr 2022 – Mar 2023",
      location: "Maputo, Mozambique",
      description: [
        "Built responsive and accessible web interfaces, achieving 100% mobile compatibility.",
        "Improved frontend performance, reducing page load times by ~25% through optimized code.",
        "Worked closely with backend teams to deliver end-to-end features."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 relative z-10 bg-background border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
            <Briefcase className="text-accent" size={36} /> Employment History
          </h2>
          <p className="text-white/60 text-lg">
            My professional journey building intelligent systems and robust applications.
          </p>
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-900 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-accent/80 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                  <h3 className="font-bold text-xl text-white">{exp.role}</h3>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded-full w-fit">{exp.period}</span>
                </div>
                <div className="text-sm text-white/50 mb-4 flex items-center gap-2">
                  <span className="font-medium text-white/80">{exp.company}</span> • <span>{exp.location}</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-2 text-white/60 text-sm">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
