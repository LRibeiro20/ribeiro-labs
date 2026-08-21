"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      company: "TRANSDIGITAL, LDA",
      role: "Software Engineer",
      period: "Jun 2025 - Present",
      location: "Hybrid",
      description: [
        "Architect and maintain scalable backend systems using Python and Flask, with a focus on secure authentication, document processing, messaging, and enterprise integrations.",
        "Design and implement REST APIs and microservices supporting production applications and AI-powered workflows.",
        "Develop Retrieval-Augmented Generation (RAG) pipelines using Google Cloud Vertex AI RAG Engine to enable AI-powered question answering over legal gazettes and user-uploaded documents.",
        "Design event-driven and asynchronous workflows using Google Cloud Run and Cloud Scheduler Jobs for document ingestion and AI processing.",
        "Build secure document processing pipelines integrating Flask services, Google Cloud Storage, and Vertex AI RAG.",
        "Automate CI/CD workflows using GitHub Actions for containerized microservices deployed to Google Cloud Run, including environment configuration, secret management, and container image versioning.",
        "Troubleshoot and support production systems, investigating integration, API, deployment, and application-level issues.",
        "Develop and support enterprise biometric identity and authentication solutions using Daon IdentityX.",
        "Develop and integrate Java-based services and Android applications with biometric identity and authentication platforms.",
        "Implement and maintain microservices responsible for integrating mobile applications, biometric SDKs, backend services, and enterprise systems.",
        "Support client implementations by troubleshooting integration issues, customizing solutions, and assisting with deployment and production support.",
        "Work with enterprise and banking-related clients, including BCI-related biometric identity solutions."
      ]
    },
    {
      company: "MozDigitalHub",
      role: "Artificial Intelligence Engineer",
      period: "Apr 2024 - Feb 2025",
      location: "EMEA · Remote",
      description: []
    },
    {
      company: "BoleiaChain",
      role: "Mobile Application Developer",
      period: "Jun 2024 - Nov 2024",
      location: "Hybrid",
      description: [
        "Mobile App Development: Writing and reviewing code to create mobile applications using React Native, ensuring they are efficient, functional, and high quality.",
        "Software Architecture: Designing the application architecture, choosing best practices and standards to ensure scalability, performance, and maintenance.",
        "API Integration: Working on integrating APIs, artificial intelligence, and external services, ensuring that applications can communicate correctly with other parts of the digital platform.",
        "Problem Solving: Identifying and resolving technical issues that arise during development, using debugging and testing to ensure application functionality.",
        "Continuous Improvement: Suggesting improvements and optimizations for existing code, always seeking to increase the efficiency and quality of the application.",
        "Mentoring and Training: Providing guidance and support to other developers on the team, helping them solve problems and improve their skills.",
        "Documentation: Maintaining clear and detailed documentation of code and development processes to facilitate future maintenance and scalability.",
        "Technological Update: Staying updated with the latest trends and advancements in React Native technology and mobile development in general, to ensure the platform uses the best practices and tools available.",
        "Testing and Quality: Implementing unit and functional tests to ensure the application is robust and bug-free before release."
      ]
    },
    {
      company: "TRANSDIGITAL, LDA",
      role: "Software Developer",
      period: "May 2023 - Feb 2024",
      location: "Maputo, Mozambique",
      description: []
    },
    {
      company: "Upgrade Consultorias, Lda",
      role: "Frontend Developer",
      period: "Apr 2022 - Mar 2023",
      location: "Maputo, Mozambique",
      description: [
        "Developed, tested, and maintained production-quality web applications using modern software engineering practices.",
        "Built responsive frontend applications using JavaScript and React.",
        "Designed software components with a focus on scalability, maintainability, and performance.",
        "Integrated payment APIs and external services into web applications.",
        "Collaborated with designers and developers to deliver a new e-commerce platform, contributing to a 25% increase in online sales.",
        "Implemented responsive user interfaces that contributed to a 20% increase in user engagement and a 15% reduction in bounce rates.",
        "Used Git for source control and collaborative software development.",
        "Investigated and resolved application issues through debugging, testing, and continuous code improvement."
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
