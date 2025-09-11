"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
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
        charSpan.style.transform = "translateY(40px)";
        wordSpan.appendChild(charSpan);
      });

      element.appendChild(wordSpan);
    });
  };

  useGSAP(
    () => {
      // Disable GSAP animations and splitText on mobile to prevent layout issues
      if (window.innerWidth <= 768) return;

      splitText(headingRef.current);
      splitText(paraRef.current);
      splitText(afterCardsRef.current);

      const headingSpans = headingRef.current.querySelectorAll("span span");
      const paraSpans = paraRef.current.querySelectorAll("span span");
      const afterSpans = afterCardsRef.current.querySelectorAll("span span");

      gsap.set(headingSpans, { opacity: 1, y: 0 });
      gsap.set(paraSpans, { opacity: 0, y: 40 });
      gsap.set(afterSpans, { opacity: 0, y: 40 });

      const endScroll = "+=700%";

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
        .to(".contact-cards-wrapper", { opacity: 1, duration: 0.01, zIndex: 99 }, "-=0.4")
        .from(
          cardRefs.current,
          { x: 300, opacity: 0, stagger: 0.5, duration: 4, zIndex: -999, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          cardRefs.current,
          {
            x: -300,
            opacity: 0,
            stagger: 0.3,
            duration: 1.5,
            zIndex: -999,
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
          { opacity: 1, scale: 1, duration: 1.2, zIndex: 99, ease: "power3.out" },
          "+=0.3"
        );
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* DESKTOP CONTACT SECTION */}
      <div className="desktop-contact-root">
        <div
          style={{
            backgroundImage: "url('/cbg.svg')",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#f8dfef",
            backgroundPosition: "left",
            backgroundSize: "cover",
            position: "relative",
            width: "100%",
            minHeight: "100%",
          }}
        >
          {/* <Breadcrumb /> */}
          <div className="contact-container">
            <div className="contact-section1" ref={sectionRef}>
              <div className="contact-section1-content">
                <h1 ref={headingRef}>ready to glow?</h1>
                <p ref={paraRef} className="intro-text">
                  Have any beauty queries or simply need to enquire about any of
                  our services? Feel free to get in touch. You can call us for
                  appointments.
                </p>

                <div className="contact-cards-wrapper" style={{ opacity: 0, zIndex: -99 }}>
                  <Link
                    href="https://maps.app.goo.gl/Xn4T7LBeDscN9n5n6"
                    target="_blank"
                  >
                    <div ref={addToRefs} className="cardStyle" style={{
                      backgroundImage:
                        "url('/map.png')",
                        backgroundPosition: 'top',
                        backgroundSize: 'cover',

                    }}></div>
                  </Link>
                  <Link href="tel:+918056168713" target="_blank">
                  <div ref={addToRefs} className="cardStyle" style={{
                      backgroundImage:
                        "url('/phone.jpg')",
                        backgroundPosition: 'top',
                        backgroundSize: 'cover',

                    }}>
                  </div>
                  </Link>
                  <Link href="mailto:bindu@instylhairnbridalstudio.com" target="_blank">
                  <div
                    ref={addToRefs}
                    className="cardStyle"
                    style={{
                      backgroundImage:
                        "url('https://imgs.search.brave.com/Um-otkvpCOIaocTPYLs_XdTgeJNhkJOZVIQ88LRfW4U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg0/MzIwNDQ2L3Bob3Rv/L3B1c2gtc2VuZC1i/dXR0b24uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXhwQ3c0/alNXSHdDeVBHS3dt/Tkczd1FJamljcHZK/RVFTcE40TElvcm5C/VFE9')",
                    }}
                  >
                  </div>
                  </Link>
                </div>

                <p className="final-message" ref={afterCardsRef}>
                  We&apos;re here to help you shine — whether it&apos;s your
                  first visit or your hundredth, your beauty journey begins
                  here.
                </p>

                <div className="insta-wrapper" ref={instaWrapperRef}>
                  <Image
                    src="/insta1.png"
                    alt="Instagram Preview"
                    width={400}
                    height={470}
                    style={{
                      objectFit: "cover",
                      objectPosition: "top",
                      borderRadius: "10px",
                    }}
                    quality={90}
                  />
                  <div className="insta-follow">
                    <p className="insta-text">Follow us on</p>
                  </div>
                    <div className="follow-social-media">
                      <a href="https://www.instagram.com/instyl_hairnbridalstudio" target="_blank">Instagram</a>
                      <a href="https://youtube.com/@instylhairnbridalstudio?si=w_RJzMWPCxzEY0uT" target="_blank">Youtube</a>
                    </div>
                </div>
              </div>
            </div>
            {/* <div className="main-content-bg1">
              <Image src="/ibg.svg" width={400} height={500} alt="bg-img" />
            </div> */}
            <div className="main-content-bg2">
              <Image src="/ibg.svg" width={400} height={500} alt="bg-img" />
            </div>
          </div>
          <FAQ />
        </div>
        <style jsx global>{`
          @media (max-width: 768px) {
            .desktop-contact-root {
              display: none !important;
            }
          }
        `}</style>
      </div>

      {/* MOBILE CONTACT SECTION */}
      <div
        className="mobile-contact-root"
        style={{
          background: "#f8dfef",
          color: "#000",
          minHeight: "100vh",
          width: "100vw",
          fontFamily: "Inter, Arial, sans-serif",
          padding: 0,
          margin: 0,
          marginTop: "4rem",
        }}
      >
        <header style={{ padding: "2.2rem 1.3rem 1.3rem 1.3rem" }}>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: ".03em",
              textTransform: "uppercase",
              textAlign: 'center'
            }}
          >
            Ready to Glow?
          </div>
          <div
            style={{
              fontSize: ".9rem",
              fontWeight: 300,
              color: "#000",
              lineHeight: 1.44,
              maxWidth: 370,
              padding: '10px',
              textAlign: 'center'
            }}
          >
            REACH OUT TO OUR TEAM FOR FAST, PERSONALIZED ASSISTANCE.
          </div>
        </header>

        <main
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            padding: "0 1.3rem 2.7rem 1.3rem",
          }}
        >
          {/* MAP SECTION */}
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                fontSize: ".99rem",
                fontWeight: 700,
                letterSpacing: ".08em",
                color: "#000",
                marginBottom: ".7rem",
              }}
            >
              OUR LOCATION
            </div>
            <div
              style={{
                width: "100%",
                borderRadius: 16,
                overflow: "hidden",
                minHeight: 120,
                boxShadow: "0 2px 16px 0 rgba(0,0,0,0.11)",
              }}
            >
              <iframe
                src="https://www.google.com/maps?q=chennai&z=15&output=embed"
                width="100%"
                height="260"
                style={{ border: 0, width: "100%", minHeight: 120 }}
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              />
            </div>
          </div>
          {/* PHONE SUPPORT */}
          <div
            style={{
              borderBottom: "1px solid #9c27b0",
              paddingBottom: "1.25rem",
              marginBottom: ".5rem",
            }}
          >
            <div
              style={{
                fontSize: ".99rem",
                fontWeight: 700,
                letterSpacing: ".08em",
                color: "#000",
              }}
            >
              PHONE SUPPORT
            </div>
            <div
              style={{
                fontSize: "1.02rem",
                marginTop: "8px",
                color: "#000",
                opacity: 0.95,
              }}
            >
              +91 98765 43210
            </div>
            <a
              href="tel:+919876543210"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 500,
                fontSize: ".97rem",
                marginTop: "1.15rem",
                color: "#000",
                background: "none",
                border: "none",
                outline: "none",
                padding: ".46em 1.15em .46em .85em",
                borderRadius: 24,
                borderBottom: "1px solid #9c27b0",
                transition: "background .2s",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Call Us Now <ArrowRight size={15} style={{ marginLeft: 2 }} />
            </a>
          </div>
          {/* EMAIL SUPPORT */}
          <div
            style={{
              borderBottom: "1px solid #9c27b0",
              paddingBottom: "1.25rem",
              marginBottom: ".5rem",
            }}
          >
            <div
              style={{
                fontSize: ".99rem",
                fontWeight: 700,
                letterSpacing: ".08em",
                color: "#000",
              }}
            >
              EMAIL SUPPORT
            </div>
            <div
              style={{
                fontSize: "1.02rem",
                marginTop: "8px",
                color: "#000",
                opacity: 0.91,
                wordBreak: "break-all",
              }}
            >
              contact@yourdomain.com
            </div>
            <a
              href="mailto:contact@yourdomain.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 500,
                fontSize: ".97rem",
                marginTop: "1.15rem",
                color: "#000",
                background: "none",
                border: "none",
                outline: "none",
                padding: ".46em 1.15em .46em .85em",
                borderRadius: 24,
                borderBottom: "1px solid #9c27b0",
                transition: "background .2s",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Send Us Email <ArrowRight size={16} style={{ marginLeft: 2 }} />
            </a>
          </div>
          
        </main>

        <section style={{ padding: "1rem" }}>
          <FAQ />
        </section>
      </div>
    </>
  );
}
