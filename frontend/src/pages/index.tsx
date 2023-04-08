import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Canvas, { Rectangle } from '@/components/canvas'
import Sidebar from '@/components/sidebar'
import React, { useState, useEffect } from "react";


export default function Home() {

  const [rectangles, setRectangles] = useState<Rectangle[]>([]);

  useEffect(() => {
    // FIXME load rectangles
  }, [rectangles]);

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
