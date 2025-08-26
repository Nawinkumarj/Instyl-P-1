"use client";

import React, { useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonialData = [
  {
    text: `I had an absolutely wonderful experience at Instyl Hair N Bridal Studio. Bindu mam was incredibly patient, kind, and professional throughout my visit. She took the time to understand my preferences and offered great suggestions on what would suit me best. The staff were also extremely good. I got a beautiful layer cut and brown highlights, and I couldn't be happier with the result!`,
    name: "SP",
    service: "Haircut",
    time: "10:15 AM • Jan 20, 2025",
  },
  {
    text: `Loved my experience at this salon! Even though my hair is very thin, they suggested the perfect cut to add volume and shape. The stylist was patient, listened to my needs, and gave me tips for styling at home. My hair feels healthier and looks fuller. Highly recommend!`,
    name: "Rehana R",
    service: "Layer Cut", 
    time: "8:28 PM • Mar 02, 2025",
  },
  {
    text: `I had an amazing hair smoothening experience! The stylist Ms.Latha was incredibly knowledgeable, very well experienced and made me feel completely at ease throughout the process. My hair feels unbelievably soft, looks sleek, and the results exceeded my expectations. I can't stop touching my hair—thank you for the fantastic service! She is a great asset to your brand.`,
    name: "Dhivya S",
    service: "Hair Styling",
    time: "12:28 PM • May 11, 2025",
  },
  {
    text: `I had a hair spa and a full arm detan. It was a great experience. I particularly liked the massage part of the hair spa done by Kowsalya ma'am. It was so relaxing and satisfying. Thanks for the excellent service`,
    name: "Uvasri M",
    service: "Hair Spa",
    time: "7:34 PM • Apr 30, 2025",
  },
];

const TestimonialCard = React.forwardRef(({ text, name, service, time }, ref) => (
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
));

export const Testimonials = () => {
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);
  const cardsRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Set initial states for title
      gsap.set([titleLeftRef.current, titleRightRef.current], {
        opacity: 0
      });
      
      gsap.set(titleLeftRef.current, { x: "-100vw" });
      gsap.set(titleRightRef.current, { x: "100vw" });

      // Set all cards to start from bottom, hidden
      cardsRefs.current.forEach((cardRef) => {
        if (cardRef.current) {
          gsap.set(cardRef.current, {
            y: "100vh", // Start from bottom of viewport
            opacity: 0,
            scale: 0.8,
          });
        }
      });

      // Create main timeline
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`, // Extended for more cards
          pin: true,
          pinSpacing: true,
          scrub: 1,
        }
      });

      // Title animation (0-15% of scroll)
      mainTimeline.to([titleLeftRef.current, titleRightRef.current], {
        x: 0,
        opacity: 1,
        duration: 0.15,
        ease: "power2.out",
      }, 0);

      // Cards animation - each card appears one by one
      cardsRefs.current.forEach((cardRef, index) => {
        if (!cardRef.current) return;

        const startTime = 0.15 + (index * 0.15);
        const midTime = startTime + 0.1;
        const endTime = startTime + 0.1;

        // Card enters from bottom to center
        mainTimeline.to(cardRef.current, {
          y: 0, // Move to center
          opacity: 1,
          scale: 1,
          duration: 0.1,
          ease: "back.out(1.2)",
        }, startTime)

        // Keep card visible in center
        .to(cardRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.05,
        }, midTime)

        // Card exits to top
        .to(cardRef.current, {
          y: "-100vh", // Exit to top
          opacity: 0,
          scale: 0.8,
          duration: 0.05,
          ease: "power2.in",
        }, endTime);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Initialize refs for cards
  cardsRefs.current = testimonialData.map((_, i) => 
    cardsRefs.current[i] || React.createRef()
  );

  return (
    <>
      <section ref={sectionRef} className="testimonials-section">
        <div className="background-title">
          <h1 className="title-part title-left" ref={titleLeftRef}>
            What<br />People
          </h1>
          <h1 className="title-part title-right" ref={titleRightRef}>
            are<br />saying
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
    </>
  );
};
