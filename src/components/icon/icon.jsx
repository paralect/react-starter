import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './icon.styles.pcss';
import IMAGES from './icons';

const Icon = ({
  icon, className, noWrapper, color, onClick,
}) => {
  const IconComponent = IMAGES[icon] || IMAGES.arrowRight;

  return (
    <button
      type="button"
      className={cn(!noWrapper && styles.iconWrapper, className, styles.icon)}
      onClick={onClick}
    >
      <IconComponent color={color} />
    </button>
  );
};

Icon.propTypes = {
  icon: PropTypes.string,
  noWrapper: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  icon: 'roundError',
  noWrapper: false,
  className: null,
  color: null,
  onClick: null,
};

export default Icon;
