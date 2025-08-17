// "use client";
// import { useRouter } from "next/navigation";

// export default function Clients() {
//   const router = useRouter();

//   const clients = [
//     {
//       img: "https://static.getimg.ai/media/getimg_ai_img-8rcnXGXwyWJ8VqJOKChpf.webp",
//       video: "https://www.w3schools.com/html/mov_bbb.mp4",
//     },
//     {
//       img: "https://static.getimg.ai/media/getimg_ai_img-Tnyx2a3sC4gFYDo3M56eb.webp",
//       video: "https://www.w3schools.com/html/movie.mp4",
//     },
//     {
//       img: "https://static.getimg.ai/media/getimg_ai_img-uXoR2am8GLjT2zVydBc9t.webp",
//       video: "https://www.w3schools.com/html/mov_bbb.mp4",
//     },
//   ];

//   return (
//     <div className="clients-container">
//       <div className="client-main">
//         {clients.map((client, index) => (
//           <div
//             key={index}
//             className="client-card"
//             onMouseEnter={(e) => {
//               const video = e.currentTarget.querySelector("video");
//               video.play();
//             }}
//             onMouseLeave={(e) => {
//               const video = e.currentTarget.querySelector("video");
//               video.pause();
//               video.currentTime = 0;
//             }}
//           >
//             <img
//               className="thumbnail"
//               src={client.img}
//               alt={`Client ${index}`}
//             />
//             <video
//               className="hover-video"
//               src={client.video}
//               muted
//               loop
//               playsInline
//               preload="none"
//             ></video>
//           </div>
//         ))}
//       </div>

//       <div className="see-more-container">
//         <button
//           onClick={() => router.push("/happyclients")}
//           className="see-more-btn"
//         >
//           See More
//         </button>
//       </div>
//     </div>
//   );
// }


// pages/playground.js or components/PlaygroundSection.jsx
'use client'
// components/PlaygroundReveal.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function PlaygroundCarousel({ items }) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial state: offscreen right, rotated slightly
    gsap.set(cardsRef.current, {
      xPercent: 100,
      opacity: 0,
      rotationY: -20,
    });

    // Scroll-triggered reveal
    gsap.to(cardsRef.current, {
      xPercent: 0,
      opacity: 1,
      rotationY: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Mouse-move “carousel tilt” effect
    cardsRef.current.forEach((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
        gsap.to(card, {
          rotationY: dx * 15,
          rotationX: dy * 10,
          scale: 1.03,
          duration: 0.4,
          ease: "power2.out",
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Helper to collect refs
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

    return (
      <div className="clients-conatiner">
        <section ref={containerRef} className="playground-carousel">
          <div className="clients-head">
            <h1>Happy Clients</h1>
          </div>
          <div className="cards-container">
            {items.map((item, i) => (
              <div key={i} ref={addToRefs} className="carousel-card">
                <img src={item.image} alt={item.title} />
              </div>
            ))}
          </div>
          <p className="carousel-caption">{`Gallery`}</p>
        </section>
      </div>
    );
}



