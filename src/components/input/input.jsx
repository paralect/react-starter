import React, { useState, forwardRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { ShowPasswordIcon, HidePasswordIcon } from 'static/icons';

import styles from './input.styles.pcss';

const Input = forwardRef(({
  type, maxLength, disabled, placeholder, error, label, className, name, defaultValue,
}, ref) => {
  const [currentType, setCurrentType] = useState(type);

  const onEyeClick = () => {
    if (currentType === 'password') setCurrentType('text');
    else setCurrentType('password');
  };

  const icon = currentType === 'password'
    ? <ShowPasswordIcon className={styles.icon} onClick={onEyeClick} />
    : <HidePasswordIcon className={styles.icon} onClick={onEyeClick} />;

  return (
    <label
      htmlFor="input"
      className={cn([styles.container], className)}
    >
      <span className={cn({
        [styles.label]: true,
        [styles.error]: error,
      }, className)}
      >
        {label}
      </span>
      <input
        type={currentType}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={cn({
          [styles.input]: true,
          [styles.password]: type === 'password',
          [styles.error]: error,
        })}
        name={name}
        defaultValue={defaultValue}
        ref={ref}
      />
      {type === 'password' && icon}
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </label>
  );
});

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']),
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

Input.defaultProps = {
  type: 'text',
  disabled: false,
  maxLength: 150,
  defaultValue: null,
  error: null,
  name: null,
  className: null,
};

export default Input;
