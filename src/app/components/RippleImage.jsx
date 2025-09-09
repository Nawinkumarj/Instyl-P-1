import React, { useRef, useEffect } from "react";

// Utility: Loads image as HTMLImageElement
const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

export default function RippleImage({ src, alt, style }) {
  const canvasRef = useRef(null);
  const animationId = useRef(null);
  const imgRef = useRef(null);

  // Ripple parameters
  const rippleRadius = 40; // size of each ripple
  const rippleStrength = 1.6; // 0.0–1.0
  const decay = 1.05; // how fast ripples fade

  // Stores ongoing ripples
  const ripples = useRef([]);

  // Render loop
  useEffect(() => {
    let running = true;
    let ctx;
    let imgW, imgH;

    loadImage(src).then((img) => {
      imgRef.current = img;
      // Fix canvas size
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      imgW = img.width;
      imgH = img.height;
      ctx = canvas.getContext("2d");

      // Animation loop
      function draw() {
        ctx.clearRect(0, 0, imgW, imgH);
        ctx.drawImage(img, 0, 0, imgW, imgH);

        // For each ripple, draw a watery distortion circle
        ripples.current = ripples.current.filter((r) => r.alpha > 0.05);
        ripples.current.forEach((r) => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, 2 * Math.PI);
          ctx.clip();

          ctx.globalAlpha = r.alpha;
          ctx.drawImage(
            img,
            r.x - r.radius,
            r.y - r.radius,
            r.radius * 2,
            r.radius * 2,
            r.x - r.radius + r.offsetX,
            r.y - r.radius + r.offsetY,
            r.radius * 2,
            r.radius * 2
          );
            ctx.restore();
            
            // ctx.save();
            // ctx.beginPath();
            // ctx.arc(r.x, r.y, r.radius * 0.95, 0, 2 * Math.PI);
            // ctx.closePath();
            // ctx.globalAlpha = r.alpha * 0.25; // change for intensity
            // ctx.fillStyle = "rgba(0,150,255,1)"; // change color here!
            // ctx.fill();
            // ctx.restore();

          r.radius += 1.6 + r.strength * 2;
          r.alpha *= decay;
        });

        if (running) animationId.current = requestAnimationFrame(draw);
      }

      draw(); // start loop
    });

    return () => {
      running = false;
      cancelAnimationFrame(animationId.current);
    };
    // Only rerun if src changes.
    // eslint-disable-next-line
  }, [src]);

  // Handle mouse movement for ripples
  const handleMouse = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Add a new ripple at cursor position
    ripples.current.push({
      x,
      y,
      radius: rippleRadius,
      alpha: rippleStrength,
      offsetX: ((Math.random() - 0.5) * 8) | 0, // subtle random shift
      offsetY: ((Math.random() - 0.5) * 8) | 0,
      strength: Math.random(),
    });
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    >
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          borderRadius: 8,
          cursor: "pointer",
        }}
        alt={alt}
        onMouseMove={handleMouse}
        onMouseEnter={handleMouse}
      />
    </div>
  );
}
