import React, { useState, useRef, useEffect } from "react";

export enum Color {
  NONE,
  BLUE,
  RED,
  YELLOW
}

export interface Rectangle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

type Props = {
  rectangles: Rectangle[];
  setRectangles: ((param: Rectangle[]) => void); 
  className?: string
}

function Canvas(props: Props) {
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const svgRef = useRef<SVGSVGElement>(null);


  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDrawing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    setCurrentPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (!startPos || !currentPos) return;
    const x = Math.min(startPos.x, currentPos.x); // FIXME need to fix drawing width
    const y = Math.min(startPos.y, currentPos.y);
    const width = Math.abs(startPos.x - currentPos.x);
    const height = Math.abs(startPos.y - currentPos.y);
    const id: string = Date.now().toString(); // using timestamp as id for now
    props.setRectangles([...props.rectangles, { id, x, y, width, height }]);
    setStartPos(null);
    setCurrentPos(null);
  };

  return (
    <svg
      ref={svgRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={props.className}
    >
      {props.rectangles.map((rectangle) => (
        <rect
          key={rectangle.id}
          x={rectangle.x}
          y={rectangle.y}
          width={rectangle.width}
          height={rectangle.height}
          fill="white"
        />
      ))}
    </svg>
  );
};

export default Canvas;
