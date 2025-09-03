"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HappyClients() {
  const containerRef = useRef(null);

 

  const sections = [
    [
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-8rcnXGXwyWJ8VqJOKChpf.webp",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-Tnyx2a3sC4gFYDo3M56eb.webp",
        video: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    [
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-uXoR2am8GLjT2zVydBc9t.webp",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-8rcnXGXwyWJ8VqJOKChpf.webp",
        video: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    [
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-uXoR2am8GLjT2zVydBc9t.webp",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-8rcnXGXwyWJ8VqJOKChpf.webp",
        video: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    [
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-uXoR2am8GLjT2zVydBc9t.webp",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-8rcnXGXwyWJ8VqJOKChpf.webp",
        video: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    [
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-uXoR2am8GLjT2zVydBc9t.webp",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-8rcnXGXwyWJ8VqJOKChpf.webp",
        video: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    // ... more sections as needed
  ];

 useGSAP(
   () => {
     if (!containerRef.current) return;

     // 🔹 Position random stickers randomly
     const randomImgs = containerRef.current.querySelectorAll(
       ".clients-random-imgs"
     );

     randomImgs.forEach((img) => {
       const x = Math.random() * window.innerWidth * 0.7;
       const y = Math.random() * window.innerHeight * 4;
       gsap.set(img, {
         position: "absolute",
         top: y,
         left: x,
         width: 120,
         height: "auto",
       });

       // Animate in
       gsap.from(img, {
         opacity: 0,
         scale: 0.5,
         duration: 0.8,
         ease: "back.out(1.7)",
         scrollTrigger: {
           trigger: img,
           start: "top 90%",
         },
       });

       // Floating hover effect
       img.addEventListener("mouseenter", () => {
         gsap.to(img, {
           scale: 1.1,
           y: -15,
           duration: 0.4,
           ease: "power2.out",
         });
       });
       img.addEventListener("mouseleave", () => {
         gsap.to(img, {
           scale: 1,
           y: 0,
           duration: 0.4,
           ease: "power2.inOut",
         });
       });
     });

     // 🔹 Animate sections
     const mainSections = containerRef.current.querySelectorAll(
       ".clientcontrol-main"
     );
     mainSections.forEach((section) => {
       gsap.from(section, {
         opacity: 0,
         y: 100,
         duration: 1,
         ease: "power3.out",
         scrollTrigger: {
           trigger: section,
           start: "top 80%",
           toggleActions: "play none none reverse",
         },
       });
     });

     // 🔹 Animate client cards
     const cards = containerRef.current.querySelectorAll(".client-card");
     cards.forEach((card) => {
       gsap.from(card, {
         opacity: 0,
         scale: 0.8,
         duration: 0.8,
         ease: "back.out(1.7)",
         scrollTrigger: {
           trigger: card,
           start: "top 85%",
         },
       });

       // Floating hover effect
       card.addEventListener("mouseenter", () => {
         gsap.to(card, {
           scale: 1.05,
           y: -10,
           duration: 0.4,
           ease: "power2.out",
         });
       });
       card.addEventListener("mouseleave", () => {
         gsap.to(card, {
           scale: 1,
           y: 0,
           duration: 0.4,
           ease: "power2.inOut",
         });
       });
     });
   },
   { scope: containerRef }
 );

  return (
    <div className="clientpage-container" ref={containerRef}>
      <div className="clientpage-main">
        {sections.map((clients, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`clientcontrol-main clientcard-control${sectionIndex}`}
          >
            <div
              className={`clientpage-section clientpage-section${
                sectionIndex + 1
              }`}
            >
              {clients.map((client, index) => (
                <div
                  key={index}
                  className={`client-card section${
                    sectionIndex + 1
                  }-card${index}`}
                  onMouseEnter={(e) => {
                    const video = e.currentTarget.querySelector("video");
                    video?.play();
                  }}
                  onMouseLeave={(e) => {
                    const video = e.currentTarget.querySelector("video");
                    if (video) {
                      video.pause();
                      video.currentTime = 0;
                    }
                  }}
                >
                  <img
                    className={`thumbnail section${
                      sectionIndex + 1
                    }-thumb${index}`}
                    src={client.img}
                    alt={`Client ${sectionIndex}-${index}`}
                    loading="lazy"
                  />
                  <video
                    className={`hover-video section${
                      sectionIndex + 1
                    }-video${index}`}
                    src={client.video}
                    muted
                    loop
                    playsInline
                    preload="none"
                  ></video>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="clients-random-imgs randoms1">
          <img src="/Stickers/st-1.png" alt="" />
        </div>
        <div className="clients-random-imgs randoms2">
          <img src="/Stickers/st-2.png" alt="" />
        </div>
        <div className="clients-random-imgs randoms3">
          <img src="/Stickers/st-3.png" alt="" />
        </div>
        <div className="clients-random-imgs randoms4">
          <img src="/Stickers/st-4.png" alt="" />
        </div>
        <div className="clients-random-imgs randoms5">
          <img src="/Stickers/st-5.png" alt="" />
        </div>
        <div className="clients-random-imgs randoms6">
          <img src="/Stickers/st-6.png" alt="" />
        </div>
        <div className="clients-random-imgs randoms7">
          <img src="/Stickers/st-7.png" alt="" />
        </div>
      </div>
    </div>
  );
}
