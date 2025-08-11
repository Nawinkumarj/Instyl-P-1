"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollFocusList() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(
    () => {
      const items = itemsRef.current;
      if (items.length === 0) return;

      // Set initial states: first item focused, others with less focus
      items.forEach((item, index) => {
        if (index === 0) {
          gsap.set(item, { scale: 1, opacity: 1, filter: "blur(0px)" });
        } else {
          gsap.set(item, { scale: 0.9, opacity: 0.6, filter: "blur(2px)" });
        }
      });

      // Update focus styles as you scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: () => {
          items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = Math.abs(itemCenter - viewportCenter);
            const threshold = window.innerHeight * 0.15;
            const isInFocus = distance < threshold;

            if (isInFocus) {
              gsap.to(item, {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.4,
                ease: "power2.out",
              });
            } else {
              const blurAmount = Math.min(
                (distance / (window.innerHeight * 0.3)) * 3,
                3
              );
              const scaleAmount = Math.max(
                0.9 - (distance / (window.innerHeight * 0.5)) * 0.1,
                0.8
              );
              const opacityAmount = Math.max(
                0.6 - (distance / (window.innerHeight * 0.5)) * 0.2,
                0.4
              );

              gsap.to(item, {
                scale: scaleAmount,
                opacity: opacityAmount,
                filter: `blur(${blurAmount}px)`,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          });
        },
      });
    },
    { scope: containerRef }
  ); // useGSAP ensures cleanup and correct context!

  // Your content
  const content = [
    {
      title: "SERVICES",
      desc: "Technology meets design. We specialize in custom web and mobile app development.",
    },
    {
      title: "WEB DEVELOPMENT",
      desc: "We specialize in full-stack web development with signature 3D elements and seamless animation. We create immersive presentations that showcase your products in their best light.",
    },
    {
      title: "WEB3 DEVELOPMENT",
      desc: "We help you pioneer in the Web3 world. We have extensive expertise in blockchain technologies, smart contracts, NFTs, dApps, and Web3 gaming.",
    },
    {
      title: "MOBILE APP DEVELOPMENT",
      desc: "We specialize in full-stack development with great user experience, backend functionality, and design that sparks wonder.",
    },
    {
      title: "UX/UI DESIGN",
      desc: "We design digital experiences using hand-drawn illustrations, motion animation, and 3D elements.",
    },
    {
      title: "IMMERSIVE WEBSITES",
      desc: "We take the audience on an immersive journey that communicates your remarkable story.",
    },
    {
      title: "GAME UI DESIGN",
      desc: "We build game UIs that connect players to the gameplay.",
    },
    {
      title: "GAMING WEBSITES",
      desc: "We are leveling up gaming presentations.",
    },
  ];

  return (
    <div className="scroll-focus-container" ref={containerRef}>
      {content.map(({ title, desc }, i) => (
        <div
          className="scroll-focus-item"
          key={i}
          ref={(el) => {
            if (el) itemsRef.current[i] = el;
          }}
        >
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
      ))}
    </div>
  );
}
