"use client";
import { useState, useRef, useEffect } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";



export default function WhatsAppHoverCard() {
  
  return (
    <div className="whatsapp-container">
      <div className="whatsapp-main">
        <IoLogoWhatsapp className="whatsapp-icon" />
        <div className="whatsapp-content">
          <div className="whatsapp-qr">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/375px-QR_code_for_mobile_English_Wikipedia.svg.png"
              alt=""
            />
          </div>
          <div className="whatsapp-written">
            <h1>whatsapp us</h1>
            <p>Scan the QR code to chat with us via your smartphone.</p>
          </div>
          <div className="whatsapp-hover">
            <Link
              href="https://wa.me/1234567890" // replace with your WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
            >
              <p data-tooltip="click me">
                Chat via desktop
                <span className="whatsapp-underline" aria-hidden="true"></span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
