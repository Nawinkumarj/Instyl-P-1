"use client";

import { useLayoutEffect, useRef } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTA from "../components/CTA";

gsap.registerPlugin(ScrollTrigger);

// Google Translate DOM Protection
function applyGoogleTranslateDOMPatch() {
  if (typeof Node === "function" && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;

    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) {
        console.warn(
          "Google Translate DOM conflict detected, skipping removal"
        );
        return child;
      }
      return originalRemoveChild.apply(this, arguments);
    };
  }
}

export default function About() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const cardSectionRef = useRef(null);
  const nextContentRef = useRef(null);
  const firstImageRef = useRef(null);
  const secondImageRef = useRef(null);
  const nextTextRef = useRef(null);
  const nextParaRef = useRef(null);
  const nextHeadRef = useRef(null);

  // Store original innerHTML for cleanup
  const originalContent = useRef({});

  const splitText = (element) => {
    if (!element || element.querySelector("span span")) return;

    // Store original content before splitting
    originalContent.current[element] = element.innerHTML;

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

  // Cleanup function to restore original content
  const restoreOriginalContent = () => {
    Object.entries(originalContent.current).forEach(([element, content]) => {
      if (element && element.parentNode) {
        element.innerHTML = content;
      }
    });
    originalContent.current = {};
  };

  useLayoutEffect(() => {
    // Apply Google Translate protection
    applyGoogleTranslateDOMPatch();

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (!mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      requestAnimationFrame(() => {
        // Split text elements
        splitText(headingRef.current);
        splitText(paraRef.current);
        splitText(nextTextRef.current);
        splitText(nextHeadRef.current);
        splitText(nextParaRef.current);

        const headingSpans =
          headingRef.current?.querySelectorAll("span span") || [];
        const paraSpans = paraRef.current?.querySelectorAll("span span") || [];
        const nextTextSpans =
          nextTextRef.current?.querySelectorAll("span span") || [];
        const nextHeadSpans =
          nextHeadRef.current?.querySelectorAll("span span") || [];
        const nextParaSpans =
          nextParaRef.current?.querySelectorAll("span span") || [];

        // Set initial states
        gsap.set(
          [
            headingSpans,
            paraSpans,
            nextTextSpans,
            nextHeadSpans,
            nextParaSpans,
          ],
          {
            y: 0,
            opacity: 0,
          }
        );

        // Main timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=4000",
            scrub: true,
            pin: true,
            id: "main-timeline",
            markers: true
          },
        });

        tl.to(imageRef.current, {
          scale: 0.5,
          xPercent: 0,
          opacity: 0.2,
          ease: "power2.inout",
        });

        tl.set(headingRef.current, { opacity: 1 });
        tl.to(headingSpans, {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 1,
          ease: "power3.out",
        });

        tl.set(paraRef.current, { opacity: 1 });
        tl.to(paraSpans, {
          opacity: 1,
          y: 0,
          stagger: 0.01,
          duration: 1,
          ease: "power2.out",
        });

        // Cards Animation
        const cards =
          cardSectionRef.current?.querySelectorAll(".about-slide-card") || [];
        if (cards.length > 0) {
          gsap.set(cards, { y: 100, opacity: 0 });

          const totalCards = cards.length;
          const cardTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: cardSectionRef.current,
              start: "top top",
              end: `+=${totalCards * 600}`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              id: "cards-timeline", // Add ID for easier cleanup
            },
          });

          cards.forEach((card, i) => {
            cardTimeline.to(
              card,
              {
                y: 0,
                opacity: 1,
                ease: "power3.out",
                duration: 1,
              },
              i * 1
            );
          });

          cards.forEach((card, i) => {
            cardTimeline.to(
              card,
              {
                rotation: () => gsap.utils.random(-2, 2),
                scale: () => gsap.utils.random(0.98, 1.02),
                duration: 0.3,
                ease: "sine.inOut",
                repeat: 2,
                yoyo: true,
              },
              totalCards + i * 1
            );
          });

          cards.forEach((card, i) => {
            cardTimeline.to(
              card,
              {
                y: -100,
                opacity: 0,
                ease: "power3.in",
                duration: 1,
              },
              totalCards * 2 + i * 1
            );
          });
        }

        // Next Content Timeline
        const nextTl = gsap.timeline({
          scrollTrigger: {
            trigger: nextContentRef.current,
            start: "top top",
            end: "+=4000",
            scrub: true,
            pin: true,
            id: "next-content-timeline", // Add ID for easier cleanup
          },
        });

        nextTl
          .set(nextHeadRef.current, { opacity: 1 }, ">")
          .to(
            nextTextSpans,
            {
              opacity: 1,
              y: 0,
              stagger: 0.03,
              duration: 1.5,
              ease: "power3.out",
            },
            ">0.2"
          )
          .to(
            firstImageRef.current,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              duration: 1.5,
            },
            ">0.2"
          )
          .set(nextHeadRef.current, { opacity: 1 }, ">")
          .to(
            nextHeadSpans,
            {
              opacity: 1,
              y: 0,
              stagger: 0.03,
              duration: 1.5,
              ease: "power3.out",
            },
            ">0.2"
          )
          .to(
            secondImageRef.current,
            {
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 2.5,
              ease: "power2.out",
            },
            ">0.2"
          )
          .set(nextParaRef.current, { opacity: 1 }, ">")
          .to(
            nextParaSpans,
            {
              opacity: 1,
              y: 0,
              stagger: 0.01,
              duration: 1,
              ease: "power2.out",
            },
            ">0.2"
          );
      });
    }, containerRef);

    // Comprehensive cleanup function
    return () => {
      // Kill all ScrollTriggers by ID first
      ["main-timeline", "cards-timeline", "next-content-timeline"].forEach(
        (id) => {
          const trigger = ScrollTrigger.getById(id);
          if (trigger) trigger.kill(true);
        }
      );

      // Kill any remaining ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));

      // Revert GSAP context
      ctx.revert();

      // Restore original DOM content
      restoreOriginalContent();

      // Refresh ScrollTrigger to clean up any remaining references
      ScrollTrigger.refresh();
    };
  }, []);

  const cardData = [
    {
      img: "https://madewithgsap.com/assets/img/card1.svg",
      title: "14+",
      text: "Years of Instyl",
    },
    {
      img: "https://madewithgsap.com/assets/img/card2.svg",
      title: "30k+",
      text: "Happy Customers.",
    },
    {
      img: "https://madewithgsap.com/assets/img/card3.svg",
      title: "5+",
      text: "Awards.",
    },
  ];

  return (
    <>
      {/* Add translate="no" to prevent Google Translate interference */}
      <div style={{ paddingTop: "3rem" }} translate="no">
        {/* <Breadcrumb /> */}
        <div ref={containerRef} className="about-container">
          <div className="about-img" ref={imageRef}>
            <img
              src="/Team/instyl_team.jpg"
              alt="About"
              rel="preload"
            />
          </div>  
          <div className="about-head">
            <h1 ref={headingRef}>fbfsb</h1>
            <p ref={paraRef}>
              Instyl Hair N Bridal Studio was established in the year of March
              11, 2010 (which is now of 14years) by Bindu Baskaran. INSTYL is
              renowned for their creative haircuts , In which they have created
              atmost of 65,000+ haircuts, they even has a record of
              creating 100+ cuts in just one day. INSTYL is known for
              the affordable price rage with extra-ordinary services to their
              clients who’s been trusting them for years. Over the past 14years
              INSTYL have achevied almost 30,000+ regular customers, 1,50,000+
              satified services. And INSTYL have created 3000+ makeups.  The
              service providers at INSTYL are extremely experienced, talented
              and trained specially by the Founder of INSTYL. INSTYL motive is
              to make every ladies who come to them feel like a queen. So what
              keeps you waiting visit INSTYL get #instylifed 
            </p>
          </div>
        </div>
      </div>

      <section className="about-card-stack" ref={cardSectionRef} translate="no">
        <div className="about-card-wrapper">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="about-slide-card"
              style={{
                transform: `rotate(${[-4, 3, -2][i]}deg)`,
              }}
            >
              <img
                src={`https://madewithgsap.com/assets/img/card${i + 1}.svg`}
                alt={`Card ${i + 1}`}
                style={{ width: "80px", marginBottom: "1rem" }}
              />
              <h3 style={{ fontSize: "1.3rem" }}>
                {
                  [
                    "14+",
                    "30K+",
                    "5+",
                  ][i]
                }
              </h3>
              <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                {
                  [
                    "Years of Instyl",
                    "Happy Customers.",
                    "Awards.",
                  ][i]
                }
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="next-content" ref={nextContentRef} translate="no">
        <div className="next-image">
          <div>
            <h1 ref={nextTextRef}>Founder</h1>
          </div>
          <div className="imaga-div">
            <img
              src="/Team/Bindu-Mam.webp"
              alt="Initial"
              ref={firstImageRef}
              className="image-layer1"
            />
            <img
              src="https://pics.craiyon.com/2024-09-04/lVIdzSccREy2xW2pf853oA.webp"
              alt="Second"
              ref={secondImageRef}
              className="image-layer2"
            />
          </div>
        </div>
        <div className="next-text">
          <h2 ref={nextHeadRef}>Bindu Baskaran</h2>
          <p ref={nextParaRef}>
            Founder of INSTYL who has 20+years of experience in the beauty
            industry. She is renowned for her creative Haircuts and  Skin-on
            finish Makeups. She have curated atmost of 50,000+
            haircuts and 3000+ makeups in her beauty jouney. Graduating
            from international based beauty school and worked with top beauty
            professionals, she have masters the skill on providing the best
            service. With a 20+years of experience and so much of struggles
            she owned her own salon INSTYL HAIR N BRIDAL STUDIO in the years
            of 2010, which is now celebrating 14 years. She is always passionate
            about her work and never miss following trends when it comes to
            makeup or haircut. Her only motive is to give highclass service in
            a minimal budget to her customers. And she super encoraging towards
            her team members. She keeps a periodical training for her team if
            she updates herself.  All ladies come to her for a cut or makeup
            will defintely love her work. So if it is a cut or makeup your
            looking for Bindu is the best choice.
          </p>
        </div>
      </section>

      <section>
        <CTA />
      </section>
    </>
  );
}
