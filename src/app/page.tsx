import Hero from "@/components/Sections/Hero";
import About from "@/components/Sections/About";
import Experience from "@/components/Sections/Experience";
import Projects from "@/components/Sections/Projects";
import Contact from "@/components/Sections/Contact";
import TerminalChat from "@/components/UI/TerminalChat";
import VoiceButton from "@/components/UI/VoiceButton";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      
      {/* Floating AI Widgets */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
        <TerminalChat />
        <VoiceButton />
      </div>
    </main>
  );
}
