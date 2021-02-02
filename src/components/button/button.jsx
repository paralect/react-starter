import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './button.styles.pcss';

const colors = {
  green: 'green',
  blue: 'blue',
  red: 'red',
};

function Button({ color, className, ...props }) {
  return (
    <button
      type="button"
      className={cn(styles.button, styles[color], className)}
      {...props}
    />
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(Object.values(colors)),
  className: PropTypes.string,
};

Button.defaultProps = {
  color: colors.blue,
  className: null,
};

export default Button;
export { colors };
