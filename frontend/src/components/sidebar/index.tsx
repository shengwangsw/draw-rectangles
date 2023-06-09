import React from 'react';
import styles from './Sidebar.module.css';

interface Props {
  numRectangles: number;
  clearRectangles: (() => void); 
  children: React.ReactNode;
}

function Sidebar( props: Props ) {

  return (
    <div className={styles.sidebar}>
      <h1>Draw Rectangles</h1>
      {props.children}
      <div className={styles.footer}>
        <p className={styles.elements}>
          {props.numRectangles} elements
        </p>
        <button onClick={props.clearRectangles}>Clear</button>
      </div>
    </div>
  );
}

export default Sidebar;
