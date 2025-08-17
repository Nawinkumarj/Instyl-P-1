    "use client";

    import { useLayoutEffect, useRef } from "react";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    
    import ServiceCard from "./components/ServiceCard";
    import CTA from "./components/CTA";
import { Testimonials } from "./components/Testimonials";
import ModelScroll from "./components/ModelScroll";
import PlaygroundCarousel from "./components/HappyClients";

    gsap.registerPlugin(ScrollTrigger);

    export default function Home() {
      const modelRef = useRef(null);
      const section1Ref = useRef(null);
      const section2Ref = useRef(null);

      const playgroundItems = [
        { image: "/Gallery/01.webp", title: "Experiment 1" },
        { image: "/Gallery/02.webp", title: "Experiment 2" },
        { image: "/Gallery/03.webp", title: "Experiment 3" },
        { image: "/Gallery/04.webp", title: "Experiment 4" },
        { image: "/Gallery/05.webp", title: "Experiment 5" },
        { image: "/Gallery/06.webp", title: "Experiment 6" },
      ];

     useLayoutEffect(() => {
       const model = modelRef.current;
       const section1 = section1Ref.current;
       const section2 = section2Ref.current;

       const modelWidth = 600;
       const startRight = 50;
       const endLeft = 50;

       const totalXMove = -(
         window.innerWidth -
         startRight -
         endLeft -
         modelWidth
       );

       // Fix model position once
       gsap.set(model, {
         position: "fixed",
         top: "50%",
         right: `${startRight}px`,
         transform: "translateY(-50%)",
         zIndex: 10,
       });

       // Scroll-driven horizontal move (stops at section2 start)
       const scrollTween = gsap.to(model, {
         x: totalXMove,
         ease: "none",
         scrollTrigger: {
           trigger: section1,
           start: "top top",
           end: "+=100vh",
           scrub: true,
         },
       });

       // Pin section2 so it scrolls while model stays fixed
       const pinSection2 = ScrollTrigger.create({
         trigger: section2,
         start: "top top",
         end: "bottom top",
         pin: true,
         pinSpacing: true,
       });

       return () => {
         scrollTween.kill();
         pinSection2.kill();
         ScrollTrigger.getAll().forEach((t) => t.kill());
       };
     }, []);

     


      return (
        <div className="home-container">
          <ModelScroll />

          <div className="home-section3">
            <section>
              <ServiceCard />
            </section>
          </div>

          <div className="home-section4">
            <section>
              <CTA />
            </section>
          </div>
          <div className="home-section5">
            <section>
              <Testimonials />
            </section>
          </div>
          <div className="ome-section6">
            <PlaygroundCarousel items={playgroundItems} />
          </div>
        </div>
      );
    }
