import React, { useState } from 'react';
import "../styles/Homepage.css";

import banner from "../assets/images/main-img.png";

const ImageWith3DEffect = () => {
  const [transform, setTransform] = useState('none');

  const handleMouseMove = (e) => {
    const { offsetWidth: width, offsetHeight: height } = e.target;
    const { offsetX: x, offsetY: y } = e.nativeEvent;

    // Calculate the rotation based on cursor position
    const rotateX = ((y / height) - 0.9) * 30; // Adjusts the sensitivity
    const rotateY = ((x / width) - 0.9) * -30;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
  };

  const handleMouseLeave = () => {
    setTransform('none'); // Reset the transform on mouse leave
  };

  return (
    <div
      className="image-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        backgroundColor: 'var(--contrase1)',
        borderRadius: '53% 79% 64% 67% / 54% 56% 77% 78%',
        transform,
        
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        
      }}
    >
      <img
        src={banner}
        
        alt="3D Effect Image"
        style={{ width: '100%',  borderRadius: '53% 59% 59% 67% / 54% 6% 95% 78%'
          
        }}
        id='banner-img'
      />
    </div>
  );
};

export default ImageWith3DEffect;
