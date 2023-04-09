import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Canvas, { Rectangle, Color } from '@/components/canvas'
import Sidebar from '@/components/sidebar'
import React, { useState, useEffect } from "react";


export default function Home() {

  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [color, setColor] = useState<Color>(Color.NONE);
  useEffect(() => {
    // FIXME load rectangles
  }, [rectangles]);

  const ButtonAdd = () => {
    return (
      <button className={styles.button}>
        +
      </button>
    )
  }

  const ButtonRemove = () => {
    return (
      <button
        className={styles.button}
        disabled={rectangles.length==0}
      >
        -
      </button>
    )
  }

  const ColorSelector = () => {
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

  return (
    <>
      <Head>
        <title>Colorize squares</title>
        <meta name="description" content="Create and remove squares with color of your choise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Sidebar numRectangles={rectangles.length}>
          <div>
            <ButtonAdd />
            <ButtonRemove />
          </div>
          <div>
            <ColorSelector />
          </div>
        </Sidebar>
        
        <Canvas
          rectangles={rectangles}
          setRectangles={setRectangles} // FIXME meet to handle this to add or remove rectangle
          className={styles.canvas}
        />
      </main>
    </>
  )
}
