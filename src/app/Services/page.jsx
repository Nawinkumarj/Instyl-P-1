"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function applyGoogleTranslateDOMPatch() {
  if (
    typeof Node === "function" &&
    Node.prototype &&
    !Node.prototype._removeChildPatched
  ) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (!child || child.parentNode !== this) {
        return child;
      }
      return originalRemoveChild.apply(this, arguments);
    };
    Node.prototype._removeChildPatched = true;
  }
}

export default function ServiceMain() {
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
   {
     title: "Service 4",
     desc: "Detail about service 4",
     img: "https://pics.craiyon.com/2024-09-04/lVIdzSccREy2xW2pf853oA.webp",
   },
 ];

  const groupedData = [];
  for (let i = 0; i < data.length; i += 2) {
    groupedData.push(data.slice(i, i + 2));
  }


  useGSAP(
    () => {
      if (window.innerWidth <= 768) return; // no animation on small screens

      applyGoogleTranslateDOMPatch();
      if (!containerRef.current) return;

      // Use GSAP context for proper scoping and cleanup
      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray(".servicemain-section");
        if (!sections.length) return;

        const sectionHeight = window.innerHeight;

        // Restore all heights before setting up timeline
        gsap.set(sections, { height: "50vh" }); // set default expanded height

        // Timeline to animate sections
      const pinDistance =
        window.innerHeight * (sections.length - 1) + window.innerHeight * 0.25;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=" + pinDistance,
          scrub: 1.2,
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
            height: "20vh", // collapse previous
            ease: "power2.inOut",
            duration: 0.4,
          }).to(
            section,
            {
              height: "70vh", // expand current
              ease: "power2.inOut",
              duration: 0.4,
            },
            "<"
          );
        });

        // Optionally shrink last when finished
        const last = sections[sections.length - 1];
        if (last) {
          tl.to(last, { height: "25vh", ease: "power2.out", duration: 0.4 });
        }
      }, containerRef); // <-- ensures all selectors are scoped within this container

      return () => ctx.revert(); // Clean up on unmount/deps change
    },
    { scope: containerRef, dependencies: [data.length] }
  );

  // render
  return (
    <div
      ref={containerRef}
      className="servicemain-container"
      translate="no"
      style={{ position: "relative", isolation: "isolate" }}
    >
      <div className="servicemain-heading" translate="no">
        <h1>Services</h1>
      </div>


      {groupedData.map((row, i) => (
        <section className="servicemain-section" key={i} translate="no">
          {row.map((item, j) => (
            <div className="servicemain-card" key={j}>
              <div className="servicemain-img">
                <img src={item.img} alt={`service ${i * 2 + j + 1}`} />
              </div>
              <div className="servicemain-content">
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </section>
      ))}


    </div>
  );
}
