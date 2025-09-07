"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Clients() {
  const router = useRouter();
  const cardsRef = useRef([]);
  const headingRef = useRef(null);
  const clients = [
    {
      img: "/Gallery/01.webp",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      img: "/Gallery/02.webp",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      img: "/Gallery/03.webp",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      img: "/Gallery/04.webp",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  // Ensure refs are cleared on each render
  cardsRef.current = [];

  // Entrance and reverse scroll animations
  useGSAP(() => {
    if (!headingRef.current || cardsRef.current.length === 0) return;
    gsap.fromTo(
      headingRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      cardsRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".client-main",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // 3D Hover animation using GSAP, with cleanup
  useGSAP(() => {
     if (window.innerWidth <= 768) return;

    cardsRef.current.forEach((card) => {
      if (!card) return;
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
        gsap.to(card, {
          rotationY: dx * 15,
          rotationX: dy * 10,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out",
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
        });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      // Cleanup on destroy
      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });
  }, [clients.length]);

  // Add refs in order
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  return (
    <div className="clients-container">
      <div className="clients-head">
        <h1 ref={headingRef}>Happy Clients</h1>
      </div>
      <div className="client-main">
        {clients.map((client, index) => (
          <div
            key={index}
            className="client-card"
            ref={addToRefs}
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
              className="thumbnail"
              src={client.img}
              alt={`Client ${index}`}
            />
            <video
              className="hover-video"
              src={client.video}
              muted
              loop
              playsInline
              preload="none"
            />
          </div>
        ))}
      </div>
      <div className="view-more-wrapper">
        <button
          className="view-more-btn"
          onClick={() => router.push("/HappyClients")}
         
        >
          <span>Explore more</span>
          <svg width="15px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
