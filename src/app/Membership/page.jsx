"use client";
import { useState, useRef, useEffect } from "react";
import { FaInstagram } from "react-icons/fa6";
import { SiGooglemaps } from "react-icons/si";
import { PiPhoneCall } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";

export default function CardForm() {
  const [formData, setFormData] = useState({
    name: "",
    expiresOn: "",
    phone: "",
    description: "",
    contact: "",
    leftDesc: "",
  });

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const lastX = useRef(0);
  const rotationRef = useRef(0);
  const typingTimeoutRef = useRef(null);
  const autoRotateInterval = useRef(null);

  // Auto rotation
  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, []);

  const startAutoRotate = () => {
    stopAutoRotate();
    autoRotateInterval.current = setInterval(() => {
      if (!isDragging && !isTyping) {
        setRotation((prev) => {
          const newRot = prev + 0.2;
          rotationRef.current = newRot;
          return newRot;
        });
      }
    }, 16);
  };

  const stopAutoRotate = () => {
    if (autoRotateInterval.current) {
      clearInterval(autoRotateInterval.current);
      autoRotateInterval.current = null;
    }
  };

  // Mouse events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    stopAutoRotate();
    lastX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const delta = e.clientX - lastX.current;
      lastX.current = e.clientX;
      setRotation((prev) => {
        const newRot = prev + delta * 0.5;
        rotationRef.current = newRot;
        return newRot;
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!isTyping) startAutoRotate();
  };

  // Typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsTyping(true);
    setRotation(0);
    rotationRef.current = 0;
    stopAutoRotate();

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      startAutoRotate();
    }, 2000);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // auto-hide after 3s
  };

  return (
    <div
      className="card-form-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h1>Get your Membership</h1>
      {/* 3D Card */}
      <div className="membership-main">
        <div
          className="card-3d-wrapper"
          onMouseDown={handleMouseDown}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          <div
            className="card-3d"
            style={{ transform: `rotateY(${rotation}deg)` }}
          >
            {/* Front */}
            <div className="card-face card-front">
              <div className="card-left">
                <img src="/Instyl.webp" className="card-front-img" alt="Logo" />
                <div className="qr-code">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/375px-QR_code_for_mobile_English_Wikipedia.svg.png"
                    alt="QR"
                  />
                </div>
                <p className="membership-scan">Scan For Offers, Appointments, Pricelist., Bookings</p>
              </div>
              <div className="card-right">
                <div>
                  <p>Name: {formData.name || " _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _"}</p>
                  <p>Expires On: {formData.expiresOn || "_ _ _ _ _ _ _ _ _ _ _ _ _ _"}</p>
                  <p>Phone: +91 {formData.phone || "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ "}</p>
                </div>
                <p className="mambership-description">This Card is Valid for the Person who Registered it</p>
                <div className="membership-contact">
                  <div className="membership-left">
                    <p>
                      <PiPhoneCall /> +91 8056168713 <span>Appointment</span>{" "}
                    </p>
                    <p>
                      <IoCallOutline /> +91 9840188177 <span>Consultation</span>
                    </p>
                  </div>
                  <div className="membership-right">
                    <p>
                      <FaInstagram /> instylhairnbridalstudio
                    </p>
                    <p>
                      <SiGooglemaps /> No.6/A, G.A. ROAD, Rajarathinam, 7th Ln,
                      Oldwasermenpet, Chennai, Tamil Nadu 600021
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="card-face card-back">
              <img src="/Instyl.webp" className="card-back-img" alt="Logo" />
              <p>Premium Membership Card</p>
            </div>
          </div>
        </div>

        {/* Form */}
        {/* Story Style Form */}
        <form className="card-input-form story-form" onSubmit={handleSubmit}>
          <p>
            <span
              className={`story-question ${
                isTyping && isTyping !== "name" ? "faded" : ""
              }`}
            >
              I am
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setIsTyping("name")}
                onBlur={() => setIsTyping(false)}
              />
              ,
            </span>

            <span
              className={`story-question ${
                isTyping && isTyping !== "leftDesc" ? "faded" : ""
              }`}
            >
              and my preferred contact number is
              <input
                name="phone"
                value={formData.phone}
                placeholder="XXXXXXXXXX"
                onChange={handleChange}
                type="tel"
                pattern="[0-9]{10}"
                onFocus={() => setIsTyping("phone")}
                onBlur={() => setIsTyping(false)}
              />
              .
            </span>

            <span
              className={`story-question ${
                isTyping && isTyping !== "phone" ? "faded" : ""
              }`}
            >
              Username @
              <input
                name="leftDesc"
                value={formData.leftDesc}
                onChange={handleChange}
                onFocus={() => setIsTyping("leftDesc")}
                onBlur={() => setIsTyping(false)}
              />
              .
            </span>
            <span
              className={`story-question ${
                isTyping && isTyping !== "phone" ? "faded" : ""
              }`}
            >
              It is my pleasure to be part of the distinguished Hair & Bridal
              Studio membership #instylfied.
            </span>
          </p>

          <div className="mem-submit-btn">
            <button type="submit" className="button type--C">
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text">Submit</span>
              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </button>
          </div>
        </form>

        {/* Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>🎉 Collect your membership card in store!</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
