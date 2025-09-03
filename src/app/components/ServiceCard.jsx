"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import CTA from "./CTA";
import RippleImage from "./RippleImage";
import CustomCursor from "./CustomCursor";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Google Translate DOM protection
function applyGoogleTranslateDOMPatch() {
  if (
    typeof Node === "function" &&
    Node.prototype &&
    !Node.prototype._removeChildPatched
  ) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (!child || child.parentNode !== this) {
        console.warn(
          "DOM conflict detected, skipping unsafe removeChild operation"
        );
        return child;
      }
      return originalRemoveChild.apply(this, arguments);
    };
    Node.prototype._removeChildPatched = true;
  }
}

export default function ServiceCard() {
  const containerRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  const data = [
    {
      title: "Service 1",
      desc: "Detail about service 1",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Service 2",
      desc: "Detail about service 2",
      img: "https://images.unsplash.com/photo-1755134148217-2dd89cc6a2c2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Service 3",
      desc: "Detail about service 3",
      img: "https://pics.craiyon.com/2024-09-04/lVIdzSccREy2xW2pf853oA.webp",
    },
  ];

  useGSAP(
    () => {
      if (window.innerWidth <= 768) return;

      applyGoogleTranslateDOMPatch();
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray(".servicecard-section");
        if (!sections.length) return;

        // Set initial states with smooth transitions
        gsap.set(sections, {
          height: "50vh",
          transformOrigin: "center center",
        });

        // Enhanced smooth pin distance calculation
        const pinDistance =
          window.innerHeight * (sections.length - 1) + window.innerHeight * 0.3;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=" + pinDistance,
            scrub: 1.2, // Increased for smoother animation
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Add smooth refreshing
            onRefresh: () => {
              gsap.set(sections, { clearProps: "all" });
              gsap.set(sections, { height: "50vh" });
            },
          },
        });

        // Enhanced animations with better easing
        sections.forEach((section, index) => {
          if (index === 0) return;
          const prev = sections[index - 1];
          if (!prev) return;

          // Smoother height transitions with custom ease
          tl.to(prev, {
            height: "20vh",
            ease: "power2.inOut",
            duration: 1, // Increased duration for smoothness
          }).to(
            section,
            {
              height: "50vh",
              ease: "power2.inOut",
              duration: 1,
            },
            "<0.2" // Slight offset for more organic feel
          );

          // Add subtle scale and opacity effects for extra smoothness
          tl.fromTo(
            section.querySelector(".service-card-content"),
            { opacity: 0.7, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              duration: 0.8,
            },
            "<0.3"
          );
        });

        // Final section animation
        const last = sections[sections.length - 1];
        if (last) {
          tl.to(last, {
            height: "25vh",
            ease: "power3.out",
            duration: 1,
          });
        }

        // Add smooth entrance animation for content
        sections.forEach((section, index) => {
          gsap.fromTo(
            section.querySelector(".service-card-content"),
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [data.length] }
  );

  return (
    <>
      {/* Render custom cursor only when hovering services */}
      
        <CustomCursor
          cursorImage="/click.svg"
          cursorSize={{ width: 100, height: 100 }}
          isVisible={cursorVisible}
        />
      <div
        ref={containerRef}
        className="servicecard-container"
        translate="no"
        style={{
          position: "relative",
          isolation: "isolate",
          // Add CSS for smoother rendering
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="servicecard-heading" translate="no">
          <h1>Services</h1>
        </div>

        {data.map((item, i) => (
          <section
            className="servicecard-section"
            key={i}
            translate="no"
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => setCursorVisible(false)}
            style={{
              position: "relative",
              // Optimize for smooth animations
              willChange: "height, transform",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="service-card-content">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
            <div className="service-card-img">
              <RippleImage
                src={item.img}
                alt={`service ${i + 1}`}
                loading="lazy"
                onError={(e) => {
                  console.warn(`Failed to load image for service ${i + 1}`);
                  e.target.style.display = "none";
                }}
              />
            </div>
          </section>
        ))}
        <Link href="/Services">
          <div className="view-more-wrapper">
            <button className="view-more-btn">
              <span>Explore more</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>
        </Link>
      </div>
    </>
  );
}
