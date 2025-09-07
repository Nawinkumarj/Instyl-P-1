"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const totalImages = 100; 
const commonImages = Array.from(
  { length: totalImages },
  (_, i) => `/portfolio/gallery_${i + 1}.webp` // adjust extension & path
);

const frameSizes = [
  "size-4x6",
  "size-5x5",
  "size-5x7",
  "size-8x10",
  "size-12x12",
];

function shuffleAndBuild(images, totalCount = 50) {
  const result = [];
  let idx = 0;
  for (let i = 0; i < totalCount; i++) {
    const size = frameSizes[Math.floor(Math.random() * frameSizes.length)];
    const img = images[idx % images.length];
    result.push({ src: img, sizeClass: size, key: `${size}-${i}` });
    idx++;
  }
  return result.sort(() => 0.5 - Math.random());
}

const Page = () => {
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const blurRef = useRef(null);
  const spacerRef = useRef(null);
  const masonryRef = useRef(null);

  // ✅ useGSAP wrapper instead of useLayoutEffect
  useGSAP(
    () => {
      // Disable GSAP animations for mobile
      if (window.innerWidth <= 768) return;

      if (
        !leftTextRef.current ||
        !rightTextRef.current ||
        !blurRef.current ||
        !masonryRef.current
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
        {
          xPercent: -100,
          opacity: 0.2,
          ease: "power2.inOut",
        },
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
        {
          xPercent: 100,
          opacity: 0.2,
          ease: "power2.inOut",
        },
        0
      );

      // ✅ Reveal masonry after animation completes
      tl.to(
        masonryRef.current,
        {
          autoAlpha: 1,
          duration: 0.5,
          pointerEvents: "auto",
          ease: "power2.out",
        },
        ">"
      );

      if (spacerRef.current) {
        spacerRef.current.style.height = `${window.innerHeight * 1.5}px`;
      }
    },
    { scope: containerRef } // ✅ gsap context auto-cleanup
  );

  const shuffledImages = shuffleAndBuild(commonImages, 50);

  return (
    <div className="portfolio-container" ref={containerRef}>
      <div className="portfolio-heading">
        <h1 className="heading">
          <span className="split-word left" ref={leftTextRef}>
            Port
          </span>
          <span className="split-word right" ref={rightTextRef}>
            folio
          </span>
        </h1>
        {/* <h2>Portfolio</h2> */}
      </div>

      <div className="portfolio-blur-layer" ref={blurRef}></div>

      {/* Initially hidden */}
      <div
        className="masonry-container"
        ref={masonryRef}
        style={{ opacity: 0}}
      >
        {shuffledImages.map(({ src, sizeClass, key }) => (
          <div className={`masonry-item ${sizeClass}`} key={key}>
            <img src={src} alt="portfolio-image" />
          </div>
        ))}
      </div>

      {/* <div ref={spacerRef}></div> */}
    </div>
  );
};

export default Page;
