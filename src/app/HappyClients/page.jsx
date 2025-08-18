"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HappyClients() {
  const router = useRouter();

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
    // ... repeat same as your original
  ];

  useEffect(() => {
    // Animate whole sections when scrolling
    gsap.utils.toArray(".clientcontrol-main").forEach((section, i) => {
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

    // Animate cards inside each section with stagger
    gsap.utils.toArray(".client-card").forEach((card) => {
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
    });

    // Floating hover effect
    const cards = document.querySelectorAll(".client-card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, y: 0, duration: 0.4, ease: "power2.inOut" });
      });
    });
  }, []);

  return (
    <div className="clientpage-container">
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
                    video.play();
                  }}
                  onMouseLeave={(e) => {
                    const video = e.currentTarget.querySelector("video");
                    video.pause();
                    video.currentTime = 0;
                  }}
                >
                  <img
                    className={`thumbnail section${
                      sectionIndex + 1
                    }-thumb${index}`}
                    src={client.img}
                    alt={`Client ${sectionIndex}-${index}`}
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
      </div>
    </div>
  );
}
