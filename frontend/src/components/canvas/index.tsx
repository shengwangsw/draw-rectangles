import React, { useState, useRef, useEffect } from "react";

interface CanvasProps {
  width: number;
  height: number;
}

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoordinates, setStartCoordinates] = useState({ x: 0, y: 0 });
  const [endCoordinates, setEndCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        rectangles.forEach((rectangle) => {
          context.fillStyle = "rgba(255, 0, 0, 0.5)";
          context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        });
      }
    }
  }, [rectangles]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setStartCoordinates({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      setEndCoordinates({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const newRectangle: Rectangle = {
      x: Math.min(startCoordinates.x, endCoordinates.x),
      y: Math.min(startCoordinates.y, endCoordinates.y),
      width: Math.abs(endCoordinates.x - startCoordinates.x),
      height: Math.abs(endCoordinates.y - startCoordinates.y),
    };
    setRectangles([...rectangles, newRectangle]);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <svg width={width} height={height}>
        {rectangles.map((rectangle, index) => (
          <rect
            key={index}
            x={rectangle.x}
            y={rectangle.y}
            width={rectangle.width}
            height={rectangle.height}
            fill="rgba(255, 0, 0, 0.5)"
          />
        ))}
      </svg>
    </canvas>
  );
};

export default Canvas;
