"use client";

import { useState } from "react";

export default function Membership() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="card-form-container">
      {/* 3D Card Preview */}
      <div className="card-3d">
        <div className="card-front">
          <h2>{formData.name || "Your Name"}</h2>
          <p>{formData.role || "Role/Title"}</p>
          <span>{formData.company || "Company"}</span>
        </div>
      </div>

      {/* Input Form */}
      <form className="card-input-form">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Enter Role"
          value={formData.role}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Enter Company"
          value={formData.company}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
