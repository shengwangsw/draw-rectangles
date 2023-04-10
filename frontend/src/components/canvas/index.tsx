import React, { useState, useRef } from "react";
import {Action, Color} from '@/components/canvas/enums';

export interface Rectangle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

type Props = {
  action: Action;
  color: Color;
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

  const removeRectangle = (point: {x: number, y: number}) => {
    const remainingRectangles = props.rectangles.filter(
      (element) => filterRectangles(element, point)
    )
    // FIXME graphql client remove rectangles
    props.setRectangles(remainingRectangles);
  }

  const filterRectangles = (rectangle: Rectangle, point: {x: number, y: number}) => {
    // returns rectangles that is not clicked
    const x_end = rectangle.x + rectangle.width;
    const y_end = rectangle.y + rectangle.height;
    const isWithin = (rectangle.x <= point.x && point.x <= x_end
      && rectangle.y <= point.y && point.y <= y_end)
    return !isWithin
  }

  const handleMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDrawing(false);
    if (props.action == Action.REMOVE) {
      removeRectangle({x: e.clientX, y: e.clientY});
      setStartPos(null);
      setCurrentPos(null);
      return;
    }
    if (!currentPos || !startPos) return
    if (props.action == Action.ADD && props.color != Color.NONE) {
      const x = Math.min(startPos.x, currentPos.x);
      const y = Math.min(startPos.y, currentPos.y);
      const width = Math.abs(startPos.x - currentPos.x);
      const height = Math.abs(startPos.y - currentPos.y);
      const id: string = Date.now().toString(); // using timestamp as id for now
      props.setRectangles([...props.rectangles, { id, x, y, width, height, color: props.color }]);
    }
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
          fill={rectangle.color}
        />
      ))}
    </svg>
  );
}

export default Canvas;
