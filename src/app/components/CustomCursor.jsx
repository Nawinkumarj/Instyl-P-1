"use client";
import React, { useState, useEffect } from "react";

const CustomCursor = ({
  cursorImage,
  cursorSize = { width: 40, height: 40 },
  isVisible,
}) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="custom-cursor-container">
      <div
        className={`custom-cursor-main ${isActive ? "active" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundImage: cursorImage ? `url(${cursorImage})` : "none",
          width: `${cursorSize.width}px`,
          height: `${cursorSize.height}px`,
          opacity: isVisible ? 1 : 0, // 👈 fade instead of unmount
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s ease, transform 0.15s ease-out",
        }}
      />
    </div>
  );
};

export default CustomCursor;
