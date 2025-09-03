"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { FaArrowRight, FaInstagram, FaYoutube } from "react-icons/fa";
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
            <p>
              INSTYL motive is to make every ladies who come to them feel like a
              queen. So what keeps you waiting visit INSTYL get #instylifed 
            </p>
          </div>
          <div className="sect1-grid">
            <div className="sect1-grid1">
              <h1>Quick Links</h1>
              <Link href="/About">
                <p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>

                  <span className="footer-text">about us</span>

                  {/* Right arrow (visible initially) */}
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p>
              </Link>

              <Link href="/Services">
                <p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="footer-text">services</span>
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p>
              </Link>
              <Link href="/Contact">
                <p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="footer-text">contact</span>
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p>
              </Link>
              <Link href="/About">
                <p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="footer-text">faq's</span>
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p>
              </Link>
            </div>
            <div className="sect1-grid1">
              <h1>InStyl PACKAGES</h1>
              <Link href="/Pricelist">
                <p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="footer-text">pricelist</span>
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p>
              </Link>

              <Link href="/Offers">
                <p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="footer-text">exclusive offers</span>
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p>
              </Link>
              <Link href="/Portfolio">
                <p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="footer-text">portfolio</span>
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p>
              </Link>
              <Link href="/HappyClients">
                <p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="footer-text">happy clients</span>
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p>
              </Link>
            </div>
            <div className="sect1-grid1">
              <h1>GET IN TOUCH</h1>
              <Link href="tel:+918056168713">
                <p className="social-link">
                  <CgProfile className="sect1-flex-ic" />
                  +91 8056168713
                </p>
              </Link>
              <Link
                href="https://www.google.com/maps/place/6%2F2+G.A+Road,+7th+lane,+Old+Washermenpet,+Chennai+-21/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="social-link">
                  <IoLocationOutline className="sect1-flex-ic" size={30} />
                  6/2 G.A Road, 7th lane, old washermenpet, Chennai -21.
                </p>
              </Link>
            </div>
            <div className="sect1-grid1">
              <h1>LEGAL NOTICES</h1>
              <Link href="/Terms">
                <p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="footer-text">terms & conditions</span>
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p>
              </Link>

              <Link href="/Terms">
                <p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="footer-text">privacy policy</span>
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p>
              </Link>
              <Link href="/Terms">
                <p className="footer-animated-button">
                  <svg
                    className="footer-icon left"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="footer-text">cookies policy</span>
                  <svg
                    className="footer-icon right"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </p>
              </Link>
            </div>

            <div className="sect1-grid1">
              <h1>FOLLOW US</h1>

              {/* Instagram 1 */}
              <Link
                href="https://www.instagram.com/instyl_hairnbridalstudio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p
                  className="social-link"
                  onMouseMove={(e) => handleMouseMove(e, "Follow", "instagram")}
                  onMouseLeave={handleMouseLeave}
                >
                  <FaInstagram className="icon instagram" />
                  instyl_hairnbridalstudio
                </p>
              </Link>

              {/* Instagram 2 */}
              <Link
                href="https://www.instagram.com/instyl_makeupartistry/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p
                  className="social-link"
                  onMouseMove={(e) => handleMouseMove(e, "Follow", "instagram")}
                  onMouseLeave={handleMouseLeave}
                >
                  <FaInstagram className="icon instagram" />
                  instyl_makeupartistry
                </p>
              </Link>

              {/* YouTube */}
              <Link
                href="https://www.youtube.com/@binduinstyl_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p
                  className="social-link"
                  onMouseMove={(e) =>
                    handleMouseMove(e, "Subscribe", "youtube")
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <FaYoutube className="icon youtube" />
                  binduinstyl_
                </p>
              </Link>

              {/* Tooltip */}
              {tooltip.visible && (
                <div
                  className={`tooltip-follow ${tooltip.type}`}
                  style={{ top: tooltip.y, left: tooltip.x }}
                >
                  {tooltip.text}
                </div>
              )}
            </div>
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
