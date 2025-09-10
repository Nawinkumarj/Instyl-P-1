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
      if (window.innerWidth <= 768) return;
      
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
      title: "Offers 1",
      desc: "Description.",
      bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Offers 2 ",
      desc: "Description",
      bg: "https://plus.unsplash.com/premium_photo-1755873888790-d5fb2a1a8944?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Offers 3 ",
      desc: "Description",
      bg: "https://images.unsplash.com/photo-1755134148217-2dd89cc6a2c2?q=80&w=1270&auto=format&fit=crop",
    },
    {
      title: "Offers 4",
      desc: "Description",
      bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Offers 5",
      desc: "Description",
      bg: "https://images.unsplash.com/photo-1755134148217-2dd89cc6a2c2?q=80&w=1170&auto=format&fit=crop",
    },
    {
      title: "Offers 6",
      desc: "Description",
      bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Offers 7",
      desc: "Description",
      bg: "https://images.unsplash.com/photo-1755134148217-2dd89cc6a2c2?q=80&w=1170&auto=format&fit=crop",
    },
    {
      title: "Offers 8",
      desc: "Description",
      bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Offers 9",
      desc: "Description",
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
          backgroundImage: "url('/ibg1.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
          width: "100%",
          height: "100%",
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
