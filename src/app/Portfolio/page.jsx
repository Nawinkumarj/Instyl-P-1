"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import "../page.module.css";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const blurRef = useRef(null);
  const cardsRef = useRef(null);

  const router = useRouter();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !leftTextRef.current ||
        !rightTextRef.current ||
        !blurRef.current ||
        !cardsRef.current
      )
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(
        leftTextRef.current,
        { xPercent: -100, opacity: 0.2, ease: "power2.inOut" },
        0
      );
      tl.fromTo(
        blurRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, ease: "power2.out" },
        0.1
      );
      tl.to(
        rightTextRef.current,
        { xPercent: 100, opacity: 0.2, ease: "power2.inOut" },
        0
      );
      tl.to(
        cardsRef.current,
        {
          autoAlpha: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "power2.out",
        },
        0.45
      );
      tl.fromTo(
        cardsRef.current.querySelectorAll(".category-card"),
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.2, ease: "power2.out" },
        0.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNavigate = (category) => {
    router.push(`/Portfolio/${category}`);
  };

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

      <div className="card-section" ref={cardsRef}>
        <div className="category-card">
          <img src="/images/kids-cover.jpg" alt="Kids" />
          <h2>For Kids</h2>
          <p>Fun and educational visuals crafted for young minds.</p>
          <button onClick={() => handleNavigate("kids")}>Explore More</button>
        </div>
        <div className="category-card">
          <img src="/images/adults-cover.jpg" alt="Adults" />
          <h2>For Adults</h2>
          <p>Elegant and professional designs suited for mature audiences.</p>
          <button onClick={() => handleNavigate("adults")}>Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
