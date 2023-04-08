import React from 'react';
import styles from './Sidebar.module.css';

interface Props {
  children: React.ReactNode;
}

function Sidebar( props: Props ) {
  return (
    <div className={styles.sidebar}>
      <h1>Draw Rectangles</h1>
      <div>
        <li>1 Line</li>
        <li>2 Line</li>
      </div>
      {props.children}
    </div>
  );
}

export default Sidebar;
