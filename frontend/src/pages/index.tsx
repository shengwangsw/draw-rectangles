import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Canvas, { Rectangle } from '@/components/canvas'
import { Action, Color } from '@/components/canvas/enums'
import Sidebar from '@/components/sidebar'
import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from '@apollo/client';


const GET_RECTANGLES = gql`
query {
  allRectangles {
    edges {
      node {
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
}
`;

const REMOVE_ALL = gql`
mutation RemoveAllRectangle {
  removeAllRectangles {
    rectangle {
      id
    }
  }
}
`;

interface GetRectanglesResult {
  allRectangles: {
    edges: {
      node: Rectangle;
    }[];
  };
};

export default function Home() {

  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [color, setColor] = useState<Color>(Color.NONE);
  const [action, setAction] = useState<Action>(Action.NONE);
  const { loading, error, data } = useQuery<GetRectanglesResult>(GET_RECTANGLES);
  const [removeAll] = useMutation<any>(REMOVE_ALL);
  useEffect(() => {
    if (data) {
      const rectangles: Rectangle[] = data.allRectangles.edges.map((edge) => edge.node);
      setRectangles(rectangles)
    }
  }, [data]);

  const ButtonAdd = () => {
    return (
      <button
        className={styles.button}
        onClick={() => setAction(Action.ADD)}
      >
        +
      </button>
    )
  }

  const ButtonRemove = () => {
    return (
      <button
        className={styles.button}
        onClick={() => setAction(Action.REMOVE)}
        disabled={rectangles.length==0}
      >
        -
      </button>
    )
  }

  const ColorSelector = () => {
    if (action != Action.ADD) {
      return <div></div>
    }
    return (
      <div>
        <button
          className={`${color==Color.BLUE?styles.selected:''} ${styles.blue}`}
          onClick={() => setColor(Color.BLUE)}
        />
        <button
          className={`${color==Color.RED?styles.selected:''} ${styles.red}`}
          onClick={() => setColor(Color.RED)}
        />
        <button
          className={`${color==Color.YELLOW?styles.selected:''} ${styles.yellow}`}
          onClick={() => setColor(Color.YELLOW)}
        />
      </div>
    )
  }

  const clearRectangles = async () => {
    await removeAll()
    setRectangles([]);
  }

  return (
    <>
      <Head>
        <title>Draw Rectangles</title>
        <meta name="description" content="Create and remove rectangles with color of your choice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Sidebar
          numRectangles={rectangles.length}
          clearRectangles={clearRectangles}
        >
          <div>
            <ButtonAdd />
            <ButtonRemove />
          </div>
          <div>
            <ColorSelector />
          </div>
        </Sidebar>
        
        <Canvas
          action={action}
          color={color}
          rectangles={rectangles}
          setRectangles={setRectangles}
          className={styles.canvas}
        />
      </main>
    </>
  )
}
