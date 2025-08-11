"use client";
import { useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModelViewer from "./ModelViewer";

// gsap.registerPlugin(ScrollTrigger);

export default function ModelScroll() {
  const modelRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  useLayoutEffect(() => {
    const model = modelRef.current;
    const section1 = section1Ref.current;
    const section2 = section2Ref.current;
    const modelWidth = 600;
    const startRight = 50;
    const endLeft = 50;
    const totalXMove = -(window.innerWidth - startRight - endLeft - modelWidth);

    // // Set model position fixed once
    // gsap.set(model, {
    //   position: "fixed",
    //   top: "50%",
    //   right: `${startRight}px`,
    //   transform: "translateY(-50%)",
    //   zIndex: 10,
    // });

    // // Animate model horizontally as you scroll through section1
    // const scrollTween = gsap.to(model, {
    //   x: totalXMove,
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: section1,
    //     start: "top top",
    //     end: "bottom top",
    //     scrub: true,
    //     pin: section1,
    //     anticipatePin: 1,
    //     markers: true,
    //     onLeave: () => {
    //       gsap.set(model, {
    //         position: "absolute",
    //         top: "50%",
    //         left: "50%",
    //         transform: "translate(-50%, -50%)",
    //         x: 0,
    //         right: "auto",
    //       });
    //     },
    //     onEnterBack: () => {
    //       gsap.set(model, {
    //         position: "fixed",
    //         top: "50%",
    //         right: `${startRight}px`,
    //         transform: "translateY(-50%)",
    //         x: 0,
    //         left: "auto",
    //       });
    //     },
    //   },
    // });

    // // Create a ScrollTrigger for section2 to keep the model fixed in place
    // const section2Trigger = ScrollTrigger.create({
    //   trigger: section2,
    //   start: "top top",
    //   end: "bottom top",
    //   pin: false,
    //   markers: true,
    //   onEnter: () => {
    //     gsap.set(model, {
    //       position: "absolute",
    //       top: "50%",
    //       left: "50%",
    //       transform: "translate(-50%, -50%)",
    //       x: 0,
    //       right: "auto",
    //     });
    //   },
    //   onLeaveBack: () => {
    //     gsap.set(model, {
    //       position: "fixed",
    //       top: "50%",
    //       right: `${startRight}px`,
    //       transform: "translateY(-50%)",
    //       x: 0,
    //       left: "auto",
    //     });
    //   },
    // });

    return () => {
      // scrollTween.kill();
      // section2Trigger.kill();
      // ScrollTrigger.getAll().forEach((t) => t.kill());
      // return () => ctx.revert();
    };
  }, []);

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
              unveil your <span className="home-perfect">perfect</span> bridal
              look
            </h1>
          </div>
          <div className="home-model" ref={modelRef} style={{ width: 600 }}>
            <ModelViewer />
          </div>
        </div>
      </section>
      <section
        className="home-section2"
        ref={section2Ref}
        style={{ height: "100vh"}}
      >
        <div className="home-main-content">
          <h1>About us</h1>
          <p>
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
