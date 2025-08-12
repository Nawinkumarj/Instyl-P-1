"use client";

import { useEffect, useRef } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Milestone, Phone, Mail } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const cardRefs = useRef([]);
  const afterCardsRef = useRef(null);

  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const splitText = (element) => {
    if (!element || element.querySelector("span span")) return; // Already split
  
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
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      splitText(headingRef.current);
      splitText(paraRef.current);
      splitText(afterCardsRef.current)

      const headingSpans = headingRef.current.querySelectorAll("span span");
      const paraSpans = paraRef.current.querySelectorAll("span span");
      const afterSpans = afterCardsRef.current.querySelectorAll("span span");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=600%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(headingSpans, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          headingSpans,
          {
            opacity: 0,
            // y: -30,
            stagger: 0.05,
            duration: 1,
            ease: "power3.in",
          },
          "+=0.3"
        )
        .to(
          paraSpans,
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          paraSpans,
          {
            opacity: 0,
            // y: 30,
            stagger: 0.03,
            duration: 1,
            ease: "power3.in",
          },
          "+=0.3"
        )
        .to(
          ".contact-cards-wrapper",
          {
            opacity: 1,
            duration: 0.01,
          },
          "-=0.4"
        )
        .from(
          cardRefs.current,
          {
            x: 300,
            opacity: 0,
            stagger: 0.5,
            duration: 5.5,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          cardRefs.current,
          {
            x: -300,
            opacity: 0,
            stagger: 0.3,
            duration: 1.5,
            ease: "power3.inOut",
          },
          "+=0.2"
        )

        .to(
          afterSpans,
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          afterSpans,
          {
            opacity: 0,
            // y: 30,
            stagger: 0.03,
            duration: 1,
            ease: "power3.in",
          },
          "+=0.3"
        );
        
        
        

      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb />
      <div className="contact-container">
        <div className="contact-section1" ref={sectionRef}>
          <div
            className="contact-section1-content"
            style={{
              position: "relative",
              textAlign: "center",
              width: "100%",
            }}
          >
            <h1 ref={headingRef}>ready to glow?</h1>
            <p ref={paraRef} className="intro-text">
              Have any beauty queries or simply need to enquire about any of our
              services? Feel free to get in touch. You can call us for
              appointments.
            </p>

            {/* Cards */}
            <div
              className="contact-cards-wrapper">
              <div ref={addToRefs} className="cardStyle">
                <Milestone size={28} />
                <span>Chennai, India</span>
              </div>
              <div ref={addToRefs} className="cardStyle">
                <Phone size={28} />
                <span>+91 98765 43210</span>
              </div>
              <div ref={addToRefs} className="cardStyle">
                <Mail size={28} />
                <span>contact@yourdomain.com</span>
              </div>
            </div>

            <p className="final-message" ref={afterCardsRef}>
              We&apos;re here to help you shine — whether it&apos;s your first
              visit or your hundredth, your beauty journey begins here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  width: "400px",
  height: "250px",
  background: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
  fontWeight: "500",
  gap: "10px",
  padding: "20px",
  textAlign: "center",
};
