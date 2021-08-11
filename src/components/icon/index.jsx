import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Store from './Store';

import styles from './icon.styles.pcss';

const Icon = ({
  iconLabel, className, noWrapper,
}) => {
  const SourceImage = Store.getImage(iconLabel);

  return (
    <div className={cn(!noWrapper && styles.iconWrapper, className)}>
      <SourceImage />
    </div>
  );
};

Icon.propTypes = {
  iconLabel: PropTypes.string,
  noWrapper: PropTypes.bool,
  className: PropTypes.string,
};

Icon.defaultProps = {
  iconLabel: 'arrowRight',
  noWrapper: false,
  className: null,
};

export default Icon;
