"use client";

import { useState } from "react";

export default function CardForm() {
  const [formData, setFormData] = useState({
    name: "",
    expiresOn: "",
    phone: "",
    description: "",
    contact: "",
    leftDesc: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="card-form-container">
      {/* 3D Card */}
      <div className="card-3d-wrapper">
        <div className="card-3d">
          {/* Front Side */}
          <div className="card-face card-front">
            <div className="card-left">
              <img src="/Instyl.webp" alt="Logo" />
              <div className="qr-code">
                {/* You can replace with actual QR later */}
                <img
                  src="/instyl-s.png"
                  alt="QR"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <small>{formData.leftDesc || "Short desc"}</small>
            </div>
            <div className="card-right">
              <div>
                <h2>{formData.name || "Your Name"}</h2>
                <p>Expires On: {formData.expiresOn || "MM/YYYY"}</p>
                <p>Phone: {formData.phone || "+91 XXXXXXXXXX"}</p>
                <p>{formData.description || "Small description here..."}</p>
              </div>
              <div>
                <p>Contact: {formData.contact || "contact@email.com"}</p>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="card-face card-back">
            <img src="/Instyl.webp" alt="Logo" />
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form
        className="card-input-form"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
        />
          {/* <input
            name="expiresOn"
            value={formData.expiresOn}
            placeholder="Expires On"
            onChange={handleChange}
          /> */}
        <input
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          onChange={handleChange}
        />
        {/* <input
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          name="contact"
          value={formData.contact}
          placeholder="Contact Details"
          onChange={handleChange}
        />
        <input
          name="leftDesc"
          value={formData.leftDesc}
          placeholder="Short Description (Left side)"
          onChange={handleChange}
        /> */}
      </form>
    </div>
  );
}
