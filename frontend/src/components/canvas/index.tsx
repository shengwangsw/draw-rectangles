import React, { useState, useRef } from "react";
import {Action, Color} from '@/components/canvas/enums';
import { gql, useQuery, useMutation } from '@apollo/client';

export interface Rectangle {
  id: string;
  ts: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const CREATE_RECTANGLE = gql`
mutation CreateRectangle($ts: String!, $x: Float!, $y: Float!, $width: Float!, $height: Float!, $color: String!) {
  createRectangle(ts: $ts, x: $x, y: $y, width: $width, height: $height, color: $color) {
    rectangle {
      id
      ts
      x
      y
      width
      height
      color
    }
  }
}
`;
const UPDATE_RECTANGLE = gql`
mutation UpdateRectangle($ts: String!, $x: Float!, $y: Float!, $width: Float!, $height: Float!, $color: String!) {
  updateRectangle(ts: $ts, x: $x, y: $y, width: $width, height: $height, color: $color) {
    rectangle {
      id
      ts
      x
      y
      width
      height
      color
    }
  }
}
`;
const REMOVE_RECTANGLE = gql`
mutation RemoveRectangle($ts: String!) {
  removeRectangle(ts: $ts) {
    rectangle {
      id
    }
  }
}
`


interface CreateRectanglesResult {
  createRectangle: {
    rectangle: Rectangle;
  };
};

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
  const [addRectangleMutation] = useMutation<CreateRectanglesResult>(CREATE_RECTANGLE);
  const [removeRectangleMutation] = useMutation<any>(REMOVE_RECTANGLE);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDrawing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    setCurrentPos({ x: e.clientX, y: e.clientY });
  };

  const removeRectangle = async (point: {x: number, y: number}) => {
    // TODO improve the way to obtain the rectangle to be removed
    const toRemove = props.rectangles.filter(
      (element) => filterRectangles(element, point)
    )[0]

    if (toRemove) {
      await removeRectangleMutation({ 
        variables: {ts: toRemove.ts}
      })
      // TODO improve the way to remove rectangle from the list
      props.setRectangles(props.rectangles.filter(
        (element) => !filterRectangles(element, point)
      ));
    }
  }

  const filterRectangles = (rectangle: Rectangle, point: {x: number, y: number}) => {
    // returns rectangles that is not clicked
    const x_end = rectangle.x + rectangle.width;
    const y_end = rectangle.y + rectangle.height;
    const isWithin = (rectangle.x <= point.x && point.x <= x_end
      && rectangle.y <= point.y && point.y <= y_end)
    return isWithin
  }

  const handleMouseUp = async (e: React.MouseEvent<SVGSVGElement>) => {
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
      const ts: string = Date.now().toString(); // using timestamp as id for now
      const rect = await addRectangleMutation({ 
        variables: {ts: ts, x, y, width, height, color: props.color }
      })
      if (rect.data) {
        props.setRectangles([...props.rectangles, rect.data.createRectangle.rectangle]);
      }
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
