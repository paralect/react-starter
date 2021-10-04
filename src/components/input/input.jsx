import React, { useState, forwardRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import { ShowPasswordIcon, HidePasswordIcon } from 'static/icons';

import styles from './input.styles.pcss';

const Input = forwardRef(({
  type, maxLength, disabled, placeholder, error, label, className, value, name, ...props
}, ref) => {
  const [currentType, setCurrentType] = useState(type);
  const formContext = useFormContext();

  const onEyeClick = () => {
    if (currentType === 'password') setCurrentType('text');
    else setCurrentType('password');
  };

  const icon = currentType === 'password'
    ? <ShowPasswordIcon className={styles.icon} onClick={onEyeClick} />
    : <HidePasswordIcon className={styles.icon} onClick={onEyeClick} />;

  const { register, formState } = formContext || {};
  const formError = formState?.errors[name];

  return (
    <label
      htmlFor={name}
      className={cn([styles.container], className)}
    >
      <span className={cn({
        [styles.label]: true,
        [styles.error]: error || formError,
      }, className)}
      >
        {label}
      </span>
      <input
        type={currentType}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        value={name ? undefined : value}
        className={cn(styles.input, className, {
          [styles.password]: type === 'password',
          [styles.error]: error || formError,
        })}
        name={name}
        ref={ref}
        {...(name && register(name))}
        {...props}
      />
      {type === 'password' && icon}
      {
        (error || formError)
        && <span className={styles.errorMessage}>{error?.message || formError.message}</span>
      }
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
  value: PropTypes.string,
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
  value: '',
  error: null,
  name: null,
  className: null,
};

export default React.memo(Input);
