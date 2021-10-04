import React, { forwardRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import styles from './textarea.styles.pcss';

const TextArea = forwardRef(({
  height, error, label, placeholder, maxLength,
  disabled, className, name, onChange, onBlur, defaultValue,
}, ref) => {
  const formContext = useFormContext();

  const { register, formState } = formContext || {};
  const formError = formState?.errors[name];

  return (
    <label
      htmlFor="textarea"
      className={cn({
        [styles.container]: true,
        [styles.error]: error || formError,
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
          [styles.error]: error || formError,
        })}
        ref={ref}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        {...(register && register(name))}
      />
      {
        (error || formError)
        && <span className={styles.errorMessage}>{formError?.message || error.message}</span>
      }
    </label>
  );
});

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
