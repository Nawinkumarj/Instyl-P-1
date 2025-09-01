"use client";
import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Utility to split text into spans
const splitText = (element) => {
  if (!element || element.querySelector("span span")) return;
  const text = element.innerText;
  const words = text.split(" ");
  element.innerHTML = "";
  words.forEach((word) => {
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";
    wordSpan.style.whiteSpace = "nowrap";
    wordSpan.style.marginRight = "8px";

    word.split("").forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      charSpan.style.display = "inline-block";
      charSpan.style.opacity = "0";
      wordSpan.appendChild(charSpan);
    });

    element.appendChild(wordSpan);
  });
};

export default function Terms() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Split all target text elements on mount
    containerRef.current
      .querySelectorAll(".gsap-split")
      .forEach((el) => splitText(el));
  }, []);

  useGSAP(
    () => {
      const sections = containerRef.current.querySelectorAll(".gsap-split");
      sections.forEach((section) => {
        const chars = section.querySelectorAll("span span");
        gsap.fromTo(
          chars,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.3,
            ease: "circ.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          }
        );
      });
    },
    { dependencies: [], scope: containerRef }
  );

  return (
    <div className="terms-container" ref={containerRef}>
      <h1 className="gsap-split">Terms and Conditions</h1>

      <section>
        <h2 className="gsap-split">Introduction</h2>
        <p className="gsap-split">
          These terms and conditions outline the rules and regulations for the
          use of Our Website. By accessing this website we assume you accept
          these terms and conditions in full.
        </p>
      </section>

      <section>
        <h2 className="gsap-split">Intellectual Property Rights</h2>
        <p className="gsap-split">
          Other than the content you own, under these Terms, the Company owns
          all intellectual property rights and materials contained in this
          Website.
        </p>
      </section>

      <section>
        <h2 className="gsap-split">Restrictions</h2>
        <p className="gsap-split">
          You are specifically restricted from all of the following:
        </p>
        <ul className="gsap-split">
          <li>Publishing website material in any other media</li>
          <li>
            Selling, sublicensing and/or otherwise commercializing material
          </li>
          <li>Publicly performing and/or showing any Website material</li>
          <li>
            Using this Website in any way that is or may be damaging to this
            Website
          </li>
        </ul>
      </section>

      <section>
        <h2 className="gsap-split">Limitation of Liability</h2>
        <p className="gsap-split">
          In no event shall the Company, nor any of its officers, directors and
          employees, be held liable for anything arising out of or in any way
          connected with your use of this Website.
        </p>
      </section>

      <section>
        <h2 className="gsap-split">Governing Law</h2>
        <p className="gsap-split">
          These Terms will be governed by and interpreted in accordance with the
          laws of India, and you submit to the non-exclusive jurisdiction of the
          state and federal courts located in India for the resolution of any
          disputes.
        </p>
      </section>
    </div>
  );
}