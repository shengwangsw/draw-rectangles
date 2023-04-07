import React from 'react';
import styles from './Sidebar.module.css';

interface Props {
  children: React.ReactNode;
}

function Sidebar( props: Props ) {
  return (
    <div className={styles.sidebar}>
      {props.children}
    </div>
  );
}

export default Sidebar;
