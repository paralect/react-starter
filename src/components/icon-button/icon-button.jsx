import React, { memo } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import styles from './icon-button.styles.pcss';

function IconButton({
  Icon, disabled, onClick, className,
}) {
  return (
    <button
      type="button"
      className={cn(styles.iconButton, className)}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
}

IconButton.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  disabled: false,
  className: null,
  onClick: null,
};

export default memo(IconButton);
