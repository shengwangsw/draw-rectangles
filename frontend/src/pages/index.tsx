import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Canvas from '@/components/canvas'
import Sidebar from '@/components/sidebar'


export default function Home() {
  
  return (
    <>
      <Head>
        <title>Colorize squares</title>
        <meta name="description" content="Create and remove squares with color of your choise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Sidebar>
          
        </Sidebar>
        
        <Canvas
          className={styles.canvas}
        />
      </main>
    </>
  )
}
