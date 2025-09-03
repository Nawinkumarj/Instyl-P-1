"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CustomCursor from "../components/CustomCursor";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollFocusList() {
  const [cursorVisible, setCursorVisible] = useState(false);

  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(
    () => {
      const items = itemsRef.current;
      if (items.length === 0) return;

      // Initial states
      items.forEach((item) => {
        gsap.set(item, {
          opacity: 0.8,
          filter: "blur(2px)",
          scale: 0.85,
        });
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: () => {
          items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = itemCenter - viewportCenter;

            // Normalize distance (-1 at top, 0 at center, +1 at bottom)
            const normalized = distance / (window.innerHeight / 2);

            // Base effects
            const scale = 1 - Math.abs(normalized) * 0.05;
            const opacity = 1 - Math.abs(normalized) * 0.2;
            const blur = Math.min(Math.abs(normalized) * 2, 2);
            const offsetY = normalized * 30;

            // Rotation: top tilts +15, center = 0, bottom tilts -15
            const rotationX = gsap.utils.mapRange(-1, 1, 6, -6, normalized);

            gsap.to(item, {
              scale,
              opacity,
              y: offsetY,
              rotationX,
              transformPerspective: 1000,
              transformOrigin: "center center",
              filter: `blur(${blur}px)`,
              duration: 0.6,
              ease: "power2.out",
            });
          });
        },
      });
    },
    { scope: containerRef }
  );

  const content = [
    {
      title: "SERVICES",
      desc: "Technology meets design.",
      bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "WEB DEVELOPMENT",
      desc: "We specialize in full-stack web dev with animation.",
      bg: "https://images.unsplash.com/photo-1755134148217-2dd89cc6a2c2?q=80&w=1170&auto=format&fit=crop",
    },
    {
      title: "WEB3 DEVELOPMENT",
      desc: "We help you pioneer Web3 world.",
      bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "MOBILE APP DEVELOPMENT",
      desc: "Great UX, backend & design.",
      bg: "https://images.unsplash.com/photo-1755134148217-2dd89cc6a2c2?q=80&w=1170&auto=format&fit=crop",
    },
    {
      title: "UX/UI DESIGN",
      desc: "Hand-drawn illustrations, motion & 3D.",
      bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "IMMERSIVE WEBSITES",
      desc: "We take audiences on a journey.",
      bg: "https://images.unsplash.com/photo-1755134148217-2dd89cc6a2c2?q=80&w=1170&auto=format&fit=crop",
    },
    {
      title: "GAME UI DESIGN",
      desc: "We connect players to gameplay.",
      bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "GAMING WEBSITES",
      desc: "Leveling up gaming presentations.",
      bg: "https://images.unsplash.com/photo-1755134148217-2dd89cc6a2c2?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <CustomCursor
        cursorImage="/click.svg"
        cursorSize={{ width: 100, height: 100 }}
        isVisible={cursorVisible}
      />
      <div
        className="scroll-focus-container"
        ref={containerRef}
        style={{
          backgroundImage: "url('/offerBg.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          position: "relative",
          width: '100%',
          height:"100%",
          // zIndex: -9,
        }}
      >
        {content.map(({ title, desc, bg }, i) => (
          <div
            className="scroll-focus-item"
            key={i}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "5px",
              cursor: "none",
            }}
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => setCursorVisible(false)}
            ref={(el) => {
              if (el) itemsRef.current[i] = el;
            }}
          >
            <div className="scroll-focus-overlay">
              <h2>{title}</h2>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
