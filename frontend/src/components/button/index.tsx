import React from 'react';
import styles from './Button.module.css';

interface Props {
  children: React.ReactNode;
}

function Sidebar( disabled: Boolean ) {
  return (
    // TODO fix disabled
    <button disabled className={styles.button} />
  );
}

export default Sidebar;
