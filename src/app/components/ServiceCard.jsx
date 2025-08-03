    "use client";

    import { useLayoutEffect, useRef } from "react";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import CTA from "./CTA";

    gsap.registerPlugin(ScrollTrigger);

    export default function ServiceCard() {
    const containerRef = useRef(null);

    const data = [
        {
        title: "Service 1",
        desc: "Detail about service 1",
        img: "https://pics.craiyon.com/2024-09-04/lVIdzSccREy2xW2pf853oA.webp",
        },
        {
        title: "Service 2",
        desc: "Detail about service 2",
        img: "https://pics.craiyon.com/2024-09-04/lVIdzSccREy2xW2pf853oA.webp",
        },
        {
        title: "Service 3",
        desc: "Detail about service 3",
        img: "https://pics.craiyon.com/2024-09-04/lVIdzSccREy2xW2pf853oA.webp",
        },
    ];

    useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray(".servicecard-section");
        const sectionHeight = window.innerHeight;
    // console.log(window.innerHeight);
        const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${sectionHeight * sections.length}`,
            scrub: true,
            pin: true,
        },
        });

        sections.forEach((section, index) => {
        if (index === 0) return;
        const prev = sections[index - 1];

        tl.to(prev, { height: "20vh", ease: "power1.out" }, "+=0.1").fromTo(
            section,
            { height: "20vh" },
            { height: "100vh", ease: "power1.out" },
            "<"
        );
        });

        // Shrink the last section AND unpin correctly
        const last = sections[sections.length - 1];
        tl.to(last, { height: "20vh", ease: "power1.out" }, "+=0.1");
    }, containerRef);

    return () => ctx.revert();
    }, []);





        return (
          <>
            <div ref={containerRef} className="servicecard-container">
              <div className="servicecard-heading">
                <h1>Services</h1>
              </div>
              {data.map((item, i) => (
                <section className="servicecard-section" key={i}>
                  <div className="service-card-content">
                    <h2>{item.title}</h2>
                    <p>{item.desc}</p>
                  </div>
                  <div className="service-card-img">
                    <img src={item.img} alt={`service ${i + 1}`} />
                  </div>
                </section>
              ))}
            </div>
            <div style={{ marginTop: "-70vh" }}></div>
         
          </>
        );
    }
