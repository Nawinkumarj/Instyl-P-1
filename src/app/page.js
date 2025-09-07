"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import ServiceCard from "./components/ServiceCard";
import CTA from "./components/CTA";
import { Testimonials } from "./components/Testimonials";
import ModelScroll from "./components/ModelScroll";
import PlaygroundCarousel from "./components/HappyClients";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const section4Ref = useRef(null);

  useGSAP(() => {
    if (window.innerWidth <= 768) return;
    gsap.from(section4Ref.current, {
      opacity: 0,
      y: 50,
      delay: 0.3,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section4Ref.current,
        start: "top 80%", // when the top of section4 is 80% from top of viewport
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div className="home-container">
      <ModelScroll />

      <div className="home-section3">
        <section>
          <ServiceCard />
        </section>
      </div>

      <div className="home-section4" ref={section4Ref}>
        <section>
          <CTA />
        </section>
      </div>

      <div className="home-section5">
        <section>
          <Testimonials />
        </section>
      </div>

      <div className="home-section6">
        <PlaygroundCarousel />
      </div>
    </div>
  );
}
