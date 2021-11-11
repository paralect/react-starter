import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './Avatar.pcss';

const sizes = {
  xl: 'l',
  l: 'l',
  m: 'm',
  s: 's',
  xs: 'xs',
};

const Avatar = ({
  size, src, fullName, className,
}) => {
  const convertedName = fullName?.split(' ').slice(0, 2).map((el) => el[0]);

  return (
    <div className={cn(styles.avatarBlock, styles[size], className)}>
      {src
        ? <img className={styles.avatarImage} src={src} alt="Person Avatar" />
        : <span className={styles.avatarName}>{convertedName}</span>}
    </div>
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
  fullName: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
};

Avatar.defaultProps = {
  size: sizes.m,
  src: null,
  fullName: null,
  className: null,
};

export default memo(Avatar);
