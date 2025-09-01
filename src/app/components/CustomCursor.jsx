
import React, { useState, useEffect } from 'react';


const CustomCursor = ({ cursorImage, cursorSize = { width: 40, height: 40 }} ) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsActive(true);
    };

    const handleMouseUp = () => {
      setIsActive(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="custom-cursor-container">
      <div
        className={`custom-cursor-main ${isActive ? 'active' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundImage: cursorImage ? `url(${cursorImage})` : 'none',
          width: `${cursorSize.width}px`,
          height: `${cursorSize.height}px`,
        }}
      />
    </div>
  );
};

export default CustomCursor;