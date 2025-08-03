"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModelViewer from "./ModelViewer";

gsap.registerPlugin(ScrollTrigger);

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

    // Set model position fixed once
    gsap.set(model, {
      position: "fixed",
      top: "50%",
      right: `${startRight}px`,
      transform: "translateY(-50%)",
      zIndex: 10,
    });

    // Animate model horizontally as you scroll through section1
    const scrollTween = gsap.to(model, {
      x: totalXMove,
      ease: "none",
      scrollTrigger: {
        trigger: section1,
        start: "top top",
        end: "bottom top", // fully scroll during section1
        scrub: true,
        pin: section1,
        anticipatePin: 1,
        markers: true,
        onLeave: () => {
          // When leaving section1, fix the model in section2
          gsap.set(model, {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            x: 0,
            right: "auto",
          });
        },
        onEnterBack: () => {
          // When scrolling back to section1, restore the fixed position
          gsap.set(model, {
            position: "fixed",
            top: "50%",
            right: `${startRight}px`,
            transform: "translateY(-50%)",
            x: 0,
            left: "auto",
          });
        },
      },
    });

    // Create a ScrollTrigger for section2 to keep the model fixed in place
    const section2Trigger = ScrollTrigger.create({
      trigger: section2,
      start: "top top",
      end: "bottom top",
      pin: false,
      markers: true,
      onEnter: () => {
        // Ensure model stays fixed in section2
        gsap.set(model, {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          x: 0,
          right: "auto",
        });
      },
      onLeaveBack: () => {
        // When scrolling back from section2, prepare for section1 animation
        gsap.set(model, {
          position: "fixed",
          top: "50%",
          right: `${startRight}px`,
          transform: "translateY(-50%)",
          x: 0,
          left: "auto",
        });
      },
    });

    return () => {
      scrollTween.kill();
      section2Trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="home-scroller">
      <section
        className="home-section1"
        ref={section1Ref}
        style={{ position: "relative", height: "100vh" }}
      >
        <div className="home-main-content">
          <h1>
            unveil your <span className="home-perfect">perfect</span> bridal
            look
          </h1>
        </div>
        <div className="home-model" ref={modelRef} style={{ width: 600 }}>
          <ModelViewer />
        </div>
      </section>
      <section
        className="home-section2"
        ref={section2Ref}
        style={{ height: "100vh", backgroundColor: "#f5f5f5" }}
      >
        <div className="home-main-content">
          <h1>About us</h1>
          <p>
            Established continues to set new standards in the beauty industry.
          </p>
        </div>
      </section>
    </div>
  );
}
    