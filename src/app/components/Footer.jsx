"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const [tooltip, setTooltip] = useState({
    text: "",
    x: 0,
    y: 0,
    visible: false,
    type: "",
  });

  const handleMouseMove = (e, text, type) => {
    setTooltip({
      text,
      type,
      x: e.clientX + 15,
      y: e.clientY + 10,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (e.clientX / innerWidth - 0.5) * 40; // range -10 to +10
      const mouseY = (e.clientY / innerHeight - 0.5) * 40;

      document
        .querySelectorAll(".footer-stickers")
        .forEach((sticker, index) => {
          const speed = (index + 1) * 2; // different movement per sticker
          sticker.style.transform = `translate(${mouseX / speed}px, ${
            mouseY / speed
          }px)`;
        });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="footer-container">
      <div className="footer-main">
        <div className="footer-sect1">
          <div className="sect1-logo-section">
            <div className="sect1-logo">
              <Image
                src="/Instyl.webp"
                alt="S Logo"
                width={150}
                height={100}
                priority
              />
            </div>
          </div>
        </div>
          <div className="footer-section-2">
            <div className="footer-link">
              <Link href="'"><p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>

                  <span className="footer-text">Happy Clients</span>

                  {/* Right arrow (visible initially) */}
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p></Link>
              <Link href=""><p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>

                  <span className="footer-text">Testimonials</span>

                  {/* Right arrow (visible initially) */}
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p></Link>
            </div>
            <div className="footer-contact">
              <a href="tel:+"><p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>

                  <span className="footer-text">+91 9788715125</span>

                  {/* Right arrow (visible initially) */}
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p></a>
              <a href="mailto:"><p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>

                  <span className="footer-text">info@instylhairnbridalstudio.com</span>

                  {/* Right arrow (visible initially) */}
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p></a>
            </div>
          </div>
        <div className="foot-sect2">
          <div className="sect2-brnd-name">
            <h1>INSTYL HAIR N BRIDAL STUDIO</h1>
          </div>
          <div className="sect2-rights">
            <p>
               © 2025, instylhairnbridalstudio, All rights reserved. | Powered
              by <span>Vcraftyu Company.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-stickers st1">
        <img src="/Stickers/st-1.png" alt="" />
      </div>
      <div className="footer-stickers st2">
        <img src="/Stickers/st-2.png" alt="" />
      </div>
      <div className="footer-stickers st3">
        <img src="/Stickers/st-3.png" alt="" />
      </div>
      <div className="footer-stickers st4">
        <img src="/Stickers/st-4.png" alt="" />
      </div>
      <div className="footer-stickers st5">
        <img src="/Stickers/st-5.png" alt="" />
      </div>
    </div>
  );
}
