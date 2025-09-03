import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = ({ strings, typeSpeed = 50, backSpeed = 50, loop = true }) => {
  // Use useRef to create a reference to the DOM element
  const typedElementRef = useRef(null);

  useEffect(() => {
    // Initialize Typed.js on the referenced element
    const typed = new Typed(typedElementRef.current, {
      strings,
      typeSpeed,
      backSpeed,
      loop,
    });

    // Cleanup the Typed instance on unmount to prevent memory leaks
    return () => {
      typed.destroy();
    };
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={typedElementRef}></span>;
};

export default TypedText;
