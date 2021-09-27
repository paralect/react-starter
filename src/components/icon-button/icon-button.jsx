import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './icon-button.styles.pcss';

function IconButton({
  Icon, color, disabled, className, ...props
}) {
  return (
    <button
      type="button"
      className={cn({
        [styles.disabled]: disabled,
      }, styles.button)}
      {...props}
    >
      <Icon />
    </button>
  );
}

IconButton.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

IconButton.defaultProps = {
  color: undefined,
  className: null,
  disabled: false,
};

export default React.memo(IconButton);
