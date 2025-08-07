"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const StackCards = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Use GSAP's official React hook for automatic cleanup
  useGSAP(
    () => {
      const validCards = cardsRef.current.filter(
        (card) => card && card.parentNode
      );

      if (validCards.length === 0) return;

      // Set initial positions
      validCards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, {
            y: 0,
            opacity: 1,
            scale: 1,
            zIndex: 0,
          });
        } else {
          gsap.set(card, {
            y: 200,
            opacity: 0,
            scale: 0.9,
            zIndex: index,
          });
        }
      });

      // Create animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate cards
      validCards.forEach((card, index) => {
        if (index === 0) return;

        tl.to(
          card,
          {
            y: index * 50,
            scale: 1,
            opacity: 1,
            zIndex: index + 1,
            ease: "power2.out",
            duration: 0.2,
          },
          index * 0.5
        );
      });

      // Cleanup is handled automatically by useGSAP
    },
    { scope: containerRef }
  ); // Scope animations to container

  const addToRefs = (el, index) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section className="stack-section" ref={containerRef} translate="no">
      <div className="stack-inner">
        {[...Array(5)].map((_, i) => (
          <div
            className="stack-card"
            key={i}
            ref={(el) => addToRefs(el, i)}
            style={{ zIndex: 5 - i }}
            translate="no"
          >
            <h3>Card {i + 1}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StackCards;
