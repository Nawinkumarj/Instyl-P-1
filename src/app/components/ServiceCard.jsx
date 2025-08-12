"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CTA from "./CTA";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Google Translate DOM protection (optional but recommended)
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

  const data = [
    {
      title: "Service 1",
      desc: "Detail about service 1",
      img: "https://pics.craiyon.com/2024-09-04/lVIdzSccREy2xW2pf853oA.webp",
    },
    {
      title: "Service 2",
      desc: "Detail about service 2",
      img: "https://pics.craiyon.com/2024-09-04/lVIdzSccREy2xW2pf853oA.webp",
    },
    {
      title: "Service 3",
      desc: "Detail about service 3",
      img: "https://pics.craiyon.com/2024-09-04/lVIdzSccREy2xW2pf853oA.webp",
    },
  ];

  // Use GSAP's official React hook for automatic cleanup
  useGSAP(
    () => {
      // Apply DOM protection
      applyGoogleTranslateDOMPatch();

      // Ensure container exists before proceeding
      if (!containerRef.current) {
        console.warn("Container ref not available");
        return;
      }

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const sections = gsap.utils.toArray(".servicecard-section");

        // Validate sections exist
        if (!sections || sections.length === 0) {
          console.warn("No service card sections found");
          return;
        }

        const sectionHeight = window.innerHeight;

        // Create timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${sectionHeight * sections.length}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: "service-cards-timeline", // Add ID for debugging
            onRefresh: () => {
              // Recalculate on window resize
              const newSections = gsap.utils.toArray(".servicecard-section");
              if (newSections.length !== sections.length) {
                console.warn("Section count changed during scroll");
              }
            },
          },
        });

        // Animate sections with error handling
        sections.forEach((section, index) => {
          if (index === 0 || !section) return;

          const prev = sections[index - 1];
          if (!prev) return;

          try {
            tl.to(
              prev,
              {
                height: "20vh",
                ease: "power1.out",
              },
              "+=0.1"
            ).fromTo(
              section,
              { height: "20vh" },
              { height: "100vh", ease: "power1.out" },
              "<"
            );
          } catch (error) {
            console.warn(`Failed to animate section ${index}:`, error);
          }
        });

        // Animate the last section
        const last = sections[sections.length - 1];
        if (last) {
          try {
            tl.to(
              last,
              {
                height: "20vh",
                ease: "power1.out",
              },
              "+=0.1"
            );
          } catch (error) {
            console.warn("Failed to animate last section:", error);
          }
        }

        // Optional: Add completion callback
        tl.eventCallback("onComplete", () => {
          console.log("Service cards animation completed");
        });
      });

      // Cleanup is handled automatically by useGSAP hook
    },
    {
      scope: containerRef, // Scope animations to the container
      dependencies: [data.length], // Re-run if data changes
    }
  );

  return (
    <>
      <div
        ref={containerRef}
        className="servicecard-container"
        translate="no" // Prevent Google Translate interference
        style={{
          // Ensure proper stacking context
          position: "relative",
          isolation: "isolate",
        }}
      >
        <div className="servicecard-heading" translate="no">
          <h1>Services</h1>
        </div>
        {data.map((item, i) => (
          <section
            className="servicecard-section"
            key={i}
            translate="no" // Prevent translation on individual sections
            style={{
              // Ensure sections have proper positioning context
              position: "relative",
            }}
          >
            <div className="service-card-content">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
            <div className="service-card-img">
              <img
                src={item.img}
                alt={`service ${i + 1}`}
                loading="lazy" // Add lazy loading for performance
                onError={(e) => {
                  console.warn(`Failed to load image for service ${i + 1}`);
                  e.target.style.display = "none";
                }}
              />

              
            </div>
          </section>
        ))}
      </div>
      <div style={{ marginTop: "-70vh" }}></div>
    </>
  );
}
