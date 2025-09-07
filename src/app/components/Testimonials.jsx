"use client";

import React, { useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonialData = [
  {
    text: `I had an absolutely wonderful experience at Instyl Hair N Bridal Studio...`,
    name: "SP",
    service: "Haircut",
    time: "10:15 AM • Jan 20, 2025",
  },
  {
    text: `Loved my experience at this salon! Even though my hair is very thin...`,
    name: "Rehana R",
    service: "Layer Cut",
    time: "8:28 PM • Mar 02, 2025",
  },
  {
    text: `I had an amazing hair smoothening experience!...`,
    name: "Dhivya S",
    service: "Hair Styling",
    time: "12:28 PM • May 11, 2025",
  },
  {
    text: `I had a hair spa and a full arm detan. It was a great experience...`,
    name: "Uvasri M",
    service: "Hair Spa",
    time: "7:34 PM • Apr 30, 2025",
  },
];

const TestimonialCard = React.forwardRef(
  ({ text, name, service, time }, ref) => (
    <div className="testimonial-card" ref={ref}>
      <div className="profile-section">
        <div className="profile-avatar">
          <CgProfile color="#FFA500" size={40} />
        </div>
        <div className="profile-info">
          <h3>{name}</h3>
          <p>{service}</p>
        </div>
      </div>
      <div className="testimonial-content">
        <blockquote>"{text}"</blockquote>
        <div className="testimonial-time">{time}</div>
      </div>
    </div>
  )
);

export const Testimonials = () => {
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsRefs = useRef([]);

  // Initialize refs
  cardsRefs.current = testimonialData.map(
    (_, i) => cardsRefs.current[i] || React.createRef()
  );

  // Use useGSAP for animation context
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Titles initial state
      gsap.set([titleLeftRef.current, titleRightRef.current], {
        opacity: 0,
      });
      gsap.set(titleLeftRef.current, { x: "-100vw" });
      gsap.set(titleRightRef.current, { x: "100vw" });

      // Cards initial state
      cardsRefs.current.forEach((cardRef) => {
        if (cardRef.current) {
          gsap.set(cardRef.current, {
            y: "100vh",
            opacity: 0,
            scale: 0.8,
          });
        }
      });

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          // markers: true, // Uncomment to debug
        },
      });

      // Animate titles
      tl.to(
        [titleLeftRef.current, titleRightRef.current],
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

      // Animate each card
      cardsRefs.current.forEach((cardRef, index) => {
        if (!cardRef.current) return;

        const start = 0.3 + index * 0.2;
        tl.to(
          cardRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.2)",
          },
          start
        )
          .to(
            cardRef.current,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.05,
            },
            start + 0.15
          )
          .to(
            cardRef.current,
            {
              y: "-100vh",
              opacity: 0,
              scale: 0.8,
              duration: 0.15,
              ease: "power2.in",
            },
            start + 0.2
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);
    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
    };
  }, []);


  return (
    <section
      ref={sectionRef}
      className="testimonials-section"
      style={{
        backgroundImage: "url('/bg3.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="background-title">
        <h1 className="title-part title-left" ref={titleLeftRef}>
          What
          <br />
          People
        </h1>
        <h1 className="title-part title-right" ref={titleRightRef}>
          are
          <br />
          saying
        </h1>
      </div>
      <div className="cards-container">
        {testimonialData.map((item, index) => (
          <TestimonialCard
            key={index}
            text={item.text}
            name={item.name}
            service={item.service}
            time={item.time}
            ref={cardsRefs.current[index]}
          />
        ))}
      </div>
    </section>
  );
};
