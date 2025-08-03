    "use client";

    import React, { useEffect, useRef } from "react";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger"; 

    gsap.registerPlugin(ScrollTrigger);

    const StackCards = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {

             gsap.set(cardsRef.current, {
               y: 200,
               opacity: 0,
               scale: 0.9,
             });
            
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=3000", // Increase this to make the scroll longer
            scrub: true,
            pin: true,
            },
        });

        cardsRef.current.forEach((card, index) => {
            tl.to(
            card,
            {
                y: index * 50,
                scale: 1,
                opacity: 1,
                zIndex: index + 1,
                ease: "power2.out",
                duration: 1,
            },
            index * 0.5 // Staggering based on timeline position
            );
        });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="stack-section" ref={containerRef}>
        <div className="stack-inner">
            {[...Array(5)].map((_, i) => (
            <div
                className="stack-card"
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                style={{ zIndex: 5 - i }}
            >
                <h3>Card {i + 1}</h3>
            </div>
            ))}
        </div>
        </section>
    );
    };

    export default StackCards;
