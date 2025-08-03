"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridMotion from "../components/grid";
import '../page.module.css';

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const gridRef = useRef(null);
  const blurRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
        },
      });

      // Split the heading
      tl.to(
        leftTextRef.current,
        {
          xPercent: -100,
          opacity: 0.2,
          ease: "power2.inOut",
        },
        0
      );
      //   blurr
      tl.fromTo(
        blurRef.current,
        {
          opacity: 0,
          scale: 0.6,
        },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
        },
        0.1
      );

      tl.to(
        rightTextRef.current,
        {
          xPercent: 100,
          opacity: 0.2,
          ease: "power2.inOut",
        },
        0
      );

      // Grid section animates from above + fades in
      tl.fromTo(
        gridRef.current,
        {
          yPercent: -75,
          opacity: 0,
          scale: 0.2,
        },
        {
          yPercent: -80,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
        },
        0.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="portfolio-container" ref={containerRef}>
      <div className="portfolio-heading">
        <h1>
          <span className="split-word left" ref={leftTextRef}>
            Port
          </span>
          <span className="split-word right" ref={rightTextRef}>
            folio
          </span>
        </h1>
      </div>
      <div className="portfolio-blur-layer" ref={blurRef}></div>
      <div className="portfolio-grid" ref={gridRef}>
        <GridMotion />
      </div>
    </div>
  );
};
export default Page;