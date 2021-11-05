import React, { useState, forwardRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { ShowPasswordIcon, HidePasswordIcon } from 'static/icons';

import styles from './Input.pcss';

const Input = forwardRef(({
  type, maxLength, disabled, placeholder, error, label, className, name,
  onChange, value, onFocus, Icon, customIcon, iconPosition, defaultOnChange,
}, ref) => {
  const [currentType, setCurrentType] = useState(type);

  const onEyeClick = () => {
    if (currentType === 'password') setCurrentType('text');
    else setCurrentType('password');
  };

  const passwordIcon = currentType === 'password'
    ? <ShowPasswordIcon className={styles.passwordIcon} onClick={onEyeClick} />
    : <HidePasswordIcon className={styles.passwordIcon} onClick={onEyeClick} />;

  const getIcon = () => {
    if (type === 'password') return passwordIcon;
    if (customIcon) return customIcon;
    if (Icon) return <Icon className={styles.icon} />;
    return null;
  };

  return (
    <div className={cn([styles.container], className)}>
      <label
        htmlFor="input"
        className={cn({
          [styles.error]: error,
        }, styles.label, className)}
      >
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          name={name}
          type={currentType}
          placeholder={placeholder}
          value={value}
          onChange={defaultOnChange || ((e) => onChange(e.target.value))}
          onFocus={onFocus}
          disabled={disabled}
          maxLength={maxLength}
          ref={ref}
          className={cn({
            [styles.error]: error,
            [styles.iconOnRight]: type === 'password' || Icon,
            [styles.iconOnLeft]: Icon && iconPosition === 'left',
          }, styles.input)}
        />
        <div className={cn({
          [styles.iconOnLeft]: iconPosition === 'left',
        }, styles.iconWrapper)}
        >
          {getIcon()}
        </div>
      </div>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']),
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOnChange: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  Icon: PropTypes.elementType,
  customIcon: PropTypes.element,
  iconPosition: PropTypes.string,
};

Input.defaultProps = {
  label: null,
  name: null,
  type: 'text',
  error: null,
  placeholder: null,
  value: null,
  onChange: null,
  defaultOnChange: null,
  onFocus: null,
  disabled: false,
  maxLength: 150,
  className: null,
  Icon: null,
  customIcon: null,
  iconPosition: 'right',
};

export default Input;
