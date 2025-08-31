"use client";

import { useRef } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Milestone, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FAQ from "../components/FAQ";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const cardRefs = useRef([]);
  const afterCardsRef = useRef(null);
  const instaWrapperRef = useRef(null);
  const instaTextRef = useRef(null);

  cardRefs.current = [];
  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

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
        charSpan.style.transform = "translateY(40px)"; // start lower
        wordSpan.appendChild(charSpan);
      });

      element.appendChild(wordSpan);
    });
  };

  useGSAP(
    () => {
      splitText(headingRef.current);
      splitText(paraRef.current);
      splitText(afterCardsRef.current);
      splitText(instaTextRef.current);

      const headingSpans = headingRef.current.querySelectorAll("span span");
      const paraSpans = paraRef.current.querySelectorAll("span span");
      const afterSpans = afterCardsRef.current.querySelectorAll("span span");
      const instaSpans = instaTextRef.current.querySelectorAll("span span");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=700%",
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
          { opacity: 0, y: -40, stagger: 0.05, duration: 1, ease: "power3.in" },
          "+=0.3"
        )
        .to(
          paraSpans,
          { opacity: 1, y: 0, stagger: 0.03, duration: 1, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          paraSpans,
          { opacity: 0, y: -40, stagger: 0.03, duration: 1, ease: "power3.in" },
          "+=0.3"
        )
        .to(".contact-cards-wrapper", { opacity: 1, duration: 0.01 }, "-=0.4")
        .from(
          cardRefs.current,
          { x: 300, opacity: 0, stagger: 0.5, duration: 4, ease: "power3.out" },
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
          { opacity: 1, y: 0, stagger: 0.03, duration: 1, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          afterSpans,
          { opacity: 0, y: -40, stagger: 0.03, duration: 1, ease: "power3.in" },
          "+=0.3"
        )
        // Insta reveal
        .to(
          instaWrapperRef.current,
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          "+=0.3"
        )
        .to(
          instaSpans,
          { opacity: 1, y: 0, stagger: 0.03, duration: 1, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          instaSpans,
          { opacity: 0, y: -40, stagger: 0.03, duration: 1, ease: "power3.in" },
          "+=0.3"
        );
    },
    { scope: sectionRef }
  );

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb />
      <div className="contact-container">
        <div className="contact-section1" ref={sectionRef}>
          <div className="contact-section1-content">
            <h1 ref={headingRef}>ready to glow?</h1>
            <p ref={paraRef} className="intro-text">
              Have any beauty queries or simply need to enquire about any of our
              services? Feel free to get in touch. You can call us for
              appointments.
            </p>

            <div className="contact-cards-wrapper" style={{ opacity: 0 }}>
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

            <div
              className="insta-wrapper"
              ref={instaWrapperRef}
            >
              <Image
                src="/insta.png"
                alt="Instagram Preview"
                width={700}
                height={400}
                style={{
                  objectFit: "cover",
                  objectPosition: "top"
                }}
              />
              <p ref={instaTextRef} className="insta-text">
                Follow us on Insta
              </p>
            </div>
          </div>
        </div>
      </div>
      <FAQ/>
    </div>
  );
}

