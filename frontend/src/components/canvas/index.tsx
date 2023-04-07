import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface CanvasProps {
  width: number;
  height: number;
}

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [reactangleId, setRectangleId] = useState('');
  const [startCoordinates, setStartCoordinates] = useState({ x: 0, y: 0 });
  const [endCoordinates, setEndCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        rectangles.forEach((rectangle) => {
          context.fillStyle = "red";
          context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        });
      }
    }
  }, [rectangles]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    let rect = rectangles.filter((rectangle) => (rectangle.x <= event.nativeEvent.offsetX && event.nativeEvent.offsetX <= rectangle.x + rectangle.width)
    && (rectangle.y <= event.nativeEvent.offsetY && event.nativeEvent.offsetY <= rectangle.y + rectangle.height))
    if (rect.length != 0) {
      setRectangleId(rect[0].id)
      return
    }
    setIsDrawing(true);
    setStartCoordinates({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      setEndCoordinates({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
    }
  };

  const handleMouseUp = () => {
    if (reactangleId != '') {
      setRectangles(rectangles.filter((rectangle) => rectangle.id !== reactangleId));
      setRectangleId('')
      return
    }
    setIsDrawing(false);
    const newRectangle: Rectangle = {
      x: Math.min(startCoordinates.x, endCoordinates.x),
      y: Math.min(startCoordinates.y, endCoordinates.y),
      width: Math.abs(endCoordinates.x - startCoordinates.x),
      height: Math.abs(endCoordinates.y - startCoordinates.y),
      id: uuidv4(),
    };
    console.log(newRectangle)
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
    />
  );
};

export default Canvas;
