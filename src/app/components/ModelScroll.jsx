"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModelViewer from "./ModelViewer";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ModelScroll() {
  const modelRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const paraRef = useRef(null);
   const headingRef = useRef(null);
  const originalContent = useRef({});


     const words = ["perfect", "beauty", "elegant", "stylish"]; // cycle words
     const [displayWord, setDisplayWord] = useState(words[0]);
     const [currentIndex, setCurrentIndex] = useState(0);

     useEffect(() => {
       const interval = setInterval(() => {
         const nextIndex = (currentIndex + 1) % words.length;
         setDisplayWord(words[nextIndex]);
         setCurrentIndex(nextIndex);
       }, 2000); // change every 2 seconds

       return () => clearInterval(interval);
     }, [currentIndex]);
  
  
  
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
  const restoreOriginalContent = () => {
    Object.entries(originalContent.current).forEach(([element, content]) => {
      if (element && element.parentNode) {
        element.innerHTML = content;
      }
    });
    originalContent.current = {};
  };



      useGSAP(
        () => {
           if (window.innerWidth <= 768) return;
          const para = paraRef.current;
          const heading = headingRef.current;
          if (!para || !heading) return;

          splitText(para);
          splitText(heading);

          const chars = para.querySelectorAll("span");
          const headingtxt = heading.querySelectorAll("span");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section2Ref.current,
              start: "top top",
              end: "bottom+=200% top",
              scrub: true,
              pin: true,
              anticipatePin: 1,
              // markers: true,
            },
          });

          tl.to(headingtxt, {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            ease: "power2.out",
            duration: 1,
          });

          tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            ease: "power2.out",
            duration: 1,
          });
        },
        { scope: section2Ref }
      );


  return (
    <div className="home-scroller">
      <section
        className="home-section1"
        ref={section1Ref}
        style={{ position: "relative", height: "100vh" }}
      >
        <div className="home-section1-content">
          <div className="home-main-content">
            <h1>
              unveil your <br />
              <span key={displayWord} className="home-perfect morph-text">
                {displayWord.split("").map((letter, i) => (
                  <span key={i} className="letter">
                    {letter}
                  </span>
                ))}
              </span>{" "}
              <br /> bridal look
            </h1>
          </div>
          <div
            className="home-model"
            style={{ width: "600px" }}>
            <ModelViewer />
          </div>
        </div>
      </section>
      <section
        className="home-section2"
        ref={section2Ref}
        style={{
          height: "100vh",
          backgroundImage: "url('/Stickers/st-12.PNG')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: 'relative',
          zIndex: -9
        }}
      >
        <div className="home-main-content">
          <h1 ref={headingRef}>About&nbsp;us</h1>
          <p ref={paraRef}>
            Instyl Hair N Bridal Studio stands as North Chennai’s biggest female
            salon, celebrated for its exceptional creativity and commitment to
            excellence. With over 15 years of dedicated service, INSTYL has
            redefined hairstyling and beauty, earning a reputation for
            innovative haircuts and remarkable client satisfaction.
            <br /> Renowned for its artistry, INSTYL has crafted over 1,00,000
            unique haircuts, including a record-breaking achievement of 100+
            cuts in a single day. Their unwavering dedication to quality and
            personalized service has cultivated a loyal clientele, with nearly
            40,000 regular customers and over 1,50,000 satisfied services
            delivered. Additionally, INSTYL has transformed more than 3,000
            clients with their expert makeup artistry.
          </p>
        </div>
      </section>
    </div>
  );
}
