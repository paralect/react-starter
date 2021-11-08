import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './Spinner.pcss';

<<<<<<< HEAD
const sizes = {
  l: 'l',
  m: 'm',
  s: 's',
};

const Spinner = ({ theme, size }) => {
  return (
    <div className={cn(styles[size], styles.container)}>
=======
const Spinner = ({ theme }) => {
  return (
    <div className={styles.container}>
>>>>>>> feat: add spinner component
      <svg className={cn({
        [styles.dark]: theme === 'dark',
      }, styles.spinner, styles.spinner_loading)}
      >
        <circle cx="20" cy="20" r="18" />
      </svg>
      <svg className={cn({
        [styles.dark]: theme === 'dark',
      }, styles.spinner)}
      >
        <circle cx="20" cy="20" r="18" />
      </svg>
    </div>
  );
};

Spinner.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
<<<<<<< HEAD
  size: PropTypes.oneOf(Object.values(sizes)),
=======
>>>>>>> feat: add spinner component
};

Spinner.defaultProps = {
  theme: 'light',
<<<<<<< HEAD
  size: sizes.m,
=======
>>>>>>> feat: add spinner component
};

export default memo(Spinner);
