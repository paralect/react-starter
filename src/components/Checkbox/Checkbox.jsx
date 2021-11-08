import React, { forwardRef, memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './Checkbox.pcss';

const Checkbox = forwardRef(({
  text, disabled, checked, onChange, className, name,
}, ref) => (
  <button
    type="button"
    onClick={onChange}
    className={cn({
      [styles.disabled]: disabled,
    }, styles.container, className)}
  >
    <input
      type="checkbox"
      name={name}
      ref={ref}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={styles.input}
    />
    <span
      className={cn({
        [styles.checked]: checked,
        [styles.disabled]: disabled,
      }, styles.checkbox)}
    />
    <label
      htmlFor="checkbox"
      className={styles.label}
    >
      {text}
    </label>
  </button>
));

Checkbox.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

Checkbox.defaultProps = {
  text: '',
  disabled: false,
  checked: null,
  className: null,
  onChange: null,
  name: null,
};

export default memo(Checkbox);
