"use client";

import Image from 'next/image'
import React from 'react'
import { CgProfile } from "react-icons/cg";
import { TbSignRight } from "react-icons/tb";
import '../page.module.css'


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
                  <h1>heading</h1>
                  <p>about us</p>
                  <p>services</p>
                  <p>contact</p>
                  <p>faq's</p>
                </div>
                <div className="sect1-grid1">
                  <h1>heading</h1>
                  <p>rate card</p>
                  <p>exclusive offers</p>
                  <p>makeup packages</p>
                </div>
                <div className="sect1-grid1">
                  <h1>heading</h1>
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
                  <h1>heading</h1>
                  <p>terms of service</p>
                  <p>privacy policy</p>
                  <p>cookies policy</p>
                </div>
                <div className="sect1-grid1">
                  <h1>heading</h1>
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
