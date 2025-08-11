"use client";
import { useState, useRef, useEffect } from "react";

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
      {/* 3D Card */}
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
              <img src="/Instyl.webp" alt="Logo" />
              <div className="qr-code">
                <img src="/instyl-s.png" alt="QR" />
              </div>
              <small>{formData.leftDesc || "Short desc"}</small>
            </div>
            <div className="card-right">
              <div>
                <h2>{formData.name || "Your Name"}</h2>
                <p>Expires On: {formData.expiresOn || "MM/YYYY"}</p>
                <p>Phone: +91 {formData.phone || "XXXXXXXXXX"}</p>
                <p>{formData.description || "Small description here..."}</p>
              </div>
              <div>
                <p>Contact: {formData.contact || "contact@email.com"}</p>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="card-face card-back">
            <img src="/Instyl.webp" alt="Logo" />
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="card-input-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          onChange={handleChange}
          type="tel"
          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
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
  );
}
