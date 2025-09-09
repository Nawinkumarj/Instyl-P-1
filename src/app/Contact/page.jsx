"use client";

import { useRef } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Milestone, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FAQ from "../components/FAQ";
import Link from "next/link";

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

      // Set heading visible at start, others hidden and moved down
      gsap.set(headingSpans, { opacity: 1, y: 0 });
      gsap.set(paraSpans, { opacity: 0, y: 40 });
      gsap.set(afterSpans, { opacity: 0, y: 40 });
      gsap.set(instaSpans, { opacity: 0, y: 40 });

      const isMobile = window.innerWidth <= 768;
      const endScroll = isMobile ? "+=300%" : "+=700%";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: endScroll,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Just animate heading out (fade/move up)
      tl.to(
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
    <div style={{ padding: "20px", position: "relative", height: "100%" }}>
      {/* <Breadcrumb /> */}
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
              <Link
                href="https://maps.app.goo.gl/Xn4T7LBeDscN9n5n6"
                target="_blank"
              >
                <div ref={addToRefs} className="cardStyle"></div>
              </Link>
              <div ref={addToRefs} className="cardStyle">
                <Phone size={28} />
                <span>+91 98765 43210</span>
              </div>
              <div
                ref={addToRefs}
                className="cardStyle"
                style={{
                  backgroundImage:
                    "url('https://imgs.search.brave.com/Um-otkvpCOIaocTPYLs_XdTgeJNhkJOZVIQ88LRfW4U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg0/MzIwNDQ2L3Bob3Rv/L3B1c2gtc2VuZC1i/dXR0b24uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXhwQ3c0/alNXSHdDeVBHS3dt/Tkczd1FJamljcHZK/RVFTcE40TElvcm5C/VFE9')",
                }}
              >
                <Mail size={28} />
                <span>contact@yourdomain.com</span>
              </div>
            </div>

            <p className="final-message" ref={afterCardsRef}>
              We&apos;re here to help you shine — whether it&apos;s your first
              visit or your hundredth, your beauty journey begins here.
            </p>

            <div className="insta-wrapper" ref={instaWrapperRef}>
              <Image
                src="/insta.png"
                alt="Instagram Preview"
                width={650}
                height={350}
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "10px",
                }}
                quality={90}
              />
              <div className="insta-follow">
                <p ref={instaTextRef} className="insta-text">
                  Follow us on
                </p>
                <div className="follow-social-media">
                  <a href="http://">Instagram</a>
                  <a href="http://">Youtube</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-content-bg1">
          <Image src="/ibg.svg" width={400} height={500} alt="bg-img" />
        </div>
        <div className="main-content-bg2">
          <Image src="/ibg.svg" width={400} height={500} alt="bg-img" />
        </div>
      </div>
      <FAQ />
    </div>
  );
}
