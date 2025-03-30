import React, {useState, useRef} from 'react'
import './ZoomImage.css';

interface InteractiveZoomImageProps {
    src: string;
    alt: string;
    zoomLevel?: number;
    className?: string;
  }



const ZoomImage = ({
 src,
  alt,
  zoomLevel = 2,
  className = ''
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setPosition({ x, y });
    };
  
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if (!containerRef.current || !e.touches[0]) return;
      
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;
      
      setPosition({ x, y });
      setIsZoomed(true);
    };
  return (    
    <div 
    className={`zoom-container  ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsZoomed(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsZoomed(false)}
    >
    <div 
        className="zoom-image-wrapper"
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
          transform: isZoomed ? `scale(${zoomLevel})` : 'scale(1)'
        }}
      >
        <img
          src={src}
          alt={alt}
          className="zoom-image"
        />
      </div>
  </div>
  )
}

export default ZoomImage