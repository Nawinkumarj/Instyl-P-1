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
      duration: 0.5,
      ease: "power2.inout",
      scrollTrigger: {
        trigger: section4Ref.current,
        start: "top 75%",
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
