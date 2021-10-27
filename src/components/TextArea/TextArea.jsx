import React, { forwardRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './TextArea.pcss';

const TextArea = forwardRef(({
  height, error, label, placeholder, maxLength,
  disabled, className, name, onChange, onBlur, defaultValue,
}, ref) => (
  <label
    htmlFor="textarea"
    className={cn({
      [styles.container]: true,
      [styles.error]: error,
    }, className)}
  >
    <span className={styles.label}>{label}</span>
    <textarea
      placeholder={placeholder}
      disabled={disabled}
      style={{ height }}
      maxLength={maxLength}
      className={cn({
        [styles.textarea]: true,
        [styles.error]: error,
      })}
      ref={ref}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
    />
    {error && <span className={styles.errorMessage}>{error.message}</span>}
  </label>
));

TextArea.propTypes = {
  height: PropTypes.string,
  maxLength: PropTypes.number,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string,
};

TextArea.defaultProps = {
  height: '80px',
  maxLength: 500,
  disabled: false,
  error: null,
  className: null,
  name: null,
  onChange: null,
  onBlur: null,
  defaultValue: null,
};

export default TextArea;
