"use client";

import Image from 'next/image'
import React from 'react'
import { CgProfile } from "react-icons/cg";
import { TbSignRight } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";

import Link from 'next/link';


    export default function Footer() {
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
                  INSTYL motive is to make every ladies who come to them feel
                  like a queen. So what keeps you waiting visit INSTYL
                  get #instylifed 
                </p>
              </div>
              <div className="sect1-grid">
                <div className="sect1-grid1">
                  <h1>Quick Links</h1>
                  <Link href="/About">
                    <p className="footer-animated-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="footer-arr-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                      <span className="footer-text">About us</span>
                      {/* <span className="footer-circle"></span> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="footer-arr-1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                    </p>
                  </Link>

                  <Link href="/Services">
                    <p>
                      <FaArrowRight size={12} />
                      services
                    </p>
                  </Link>
                  <Link href="/Contact">
                    <p>
                      <FaArrowRight size={12} />
                      contact
                    </p>
                  </Link>
                  <Link href="/About">
                    <p>
                      <FaArrowRight size={12} />
                      faq's
                    </p>
                  </Link>
                </div>
                <div className="sect1-grid1">
                  <h1>InStyl PACKAGES</h1>
                  <Link href="/Pricelsit">
                    <p>Pricelist</p>
                  </Link>
                  <Link href="/Offers">
                    <p>Exclusive offers</p>
                  </Link>
                  <Link href="/Portfolio">
                    <p>Portfolio</p>
                  </Link>
                  <Link href="/HappyClients">
                    <p>Happy Clients</p>
                  </Link>
                </div>
                <div className="sect1-grid1">
                  <h1>GET IN TOUCH</h1>
                  <div className="sect1-flex">
                    <CgProfile className="sect1-flex-ic" size={30} />
                    <p> +91 8056168713</p>
                  </div>
                  <div className="sect1-flex">
                    <TbSignRight className="sect1-flex-ic" size={30} />
                    <p>
                      6/2 G.A Road, 7th lane, old washermenpet, Chennai -21.
                    </p>
                  </div>
                </div>
                <div className="sect1-grid1">
                  <h1>LEGAL NOTICES</h1>
                  <p>terms of service</p>
                  <p>privacy policy</p>
                  <p>cookies policy</p>
                </div>
                <div className="sect1-grid1">
                  <h1>FOLLOW US</h1>
                  <p>
                    <span>@</span>instyl_hairnbridalstudio
                  </p>
                  <p>
                    {" "}
                    <span>@</span>instyl_makeupartistry
                  </p>
                  <p>
                    {" "}
                    <span>@</span>binduinstyl_
                  </p>
                </div>
              </div>
            </div>
            <div className="foot-sect2">
              <div className="sect2-brnd-name">
                <h1>INSTYL HAIR N BRIDAL STUDIO</h1>
              </div>
              <div className="sect2-rights">
                <p>
                   © 2025, instylhairnbridalstudio, All rights reserved. |
                  Powered by <span>Vcraftyu Company.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
