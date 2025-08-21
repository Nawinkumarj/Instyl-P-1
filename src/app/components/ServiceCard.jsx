"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import CTA from "./CTA"; // Assuming you have a CTA component
import RippleImage from "./RippleImage";

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
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
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

  useGSAP(
    () => {
      if (window.innerWidth <= 768) return;

      applyGoogleTranslateDOMPatch();
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray(".servicecard-section"); // or ".servicemain-section"
        if (!sections.length) return;

        // Always reset heights initially
        gsap.set(sections, { height: "50vh" });

        // Compute smart pin distance
        const pinDistance =
          window.innerHeight * (sections.length - 1) +
          window.innerHeight * 0.25;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=" + pinDistance,
            scrub: 0.7, // smoother!
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        sections.forEach((section, index) => {
          if (index === 0) return;
          const prev = sections[index - 1];
          if (!prev) return;

          tl.to(prev, {
            height: "20vh",
            ease: "power2.inOut",
            duration: 0.4,
          }).to(
            section,
            { height: "50vh", ease: "power2.inOut", duration: 0.4 },
            "<"
          );
        });

        const last = sections[sections.length - 1];
        if (last) {
          tl.to(last, { height: "25vh", ease: "power2.out", duration: 0.4 });
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [data.length] }
  );


  return (
    <>
      <div
        ref={containerRef}
        className="servicecard-container"
        translate="no"
        style={{
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
            translate="no"
            style={{ position: "relative" }}
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
            <button className="view-more-btn">View More</button>
          </div>
        </Link>
      </div>

      {/* ✅ Single "View More" button below all cards */}

      {/* <div className="service-card-dummy"></div> */}
    </>
  );
}
