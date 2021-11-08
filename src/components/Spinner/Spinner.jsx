import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './Spinner.pcss';

const Spinner = ({ theme }) => {
  return (
    <div className={styles.container}>
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
};

Spinner.defaultProps = {
  theme: 'light',
};

export default memo(Spinner);
