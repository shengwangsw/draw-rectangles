import React, { useState, useRef, useEffect } from 'react';
import styles from '@/components/canvas/Canvas.module.css';
import Sidebar from '@/components/sidebar';

function Canvas() {
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
    }
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setStartPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (startPos) {
      const svg = svgRef.current;
      if (svg) {
        const x = Math.min(startPos.x, event.clientX);
        const y = Math.min(startPos.y, event.clientY);
        const width = Math.abs(event.clientX - startPos.x);
        const height = Math.abs(event.clientY - startPos.y);
        const d = `M${x},${y} H${x + width} V${y + height} H${x} V${y}`;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'red');
        path.setAttribute('opacity', '0.5');
        if (svg.lastChild) {
          svg.lastChild?.replaceWith(path);
        } else {
          svg.appendChild(path);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setStartPos(null);
  };

  return (
    <div className={styles.content}>
      <Sidebar>
        <canvas
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className={styles.canvas}
        />
      </Sidebar>
      
      <div className={styles.main}>
        <svg ref={svgRef}/>
      </div>
    </div>
  );
}

export default Canvas;
