import React, { useEffect } from "react";
import "@/App.css";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { Articles } from "@/components/Articles";
import { CodingProfiles } from "@/components/CodingProfiles";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="App grain" data-testid="app-root">
      <AmbientBackground />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Research />
          <Articles />
          <CodingProfiles />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
