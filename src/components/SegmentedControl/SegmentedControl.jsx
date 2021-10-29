import React, { memo } from 'react';
import cn from 'classnames';

import styles from './SegmentedControl.pcss';

const SegmentedControl = ({
  // eslint-disable-next-line
  value, onChange, options,
}) => {
  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line react/prop-types */}
      {options.map((option) => (
        <div className={cn({
          [styles.active]: option.isActive,
        }, styles.segment)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default memo(SegmentedControl);
