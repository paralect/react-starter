import React, { forwardRef, memo, useCallback } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import InputController from 'components/InputController';

import styles from './RadioButton.pcss';

const RadioButtonComponent = forwardRef(({
  text, disabled, value, onChange, className, name,
}, ref) => {
  const handleChange = useCallback(() => onChange(!value), [onChange, value]);

  return (
    <button
      type="button"
      onClick={handleChange}
      className={cn({
        [styles.disabled]: disabled,
      }, styles.container, className)}
    >
      <div
        className={cn({
          [styles.checked]: value,
          [styles.disabled]: disabled,
        }, styles.radio)}
      >
        <input
          type="radio"
          name={name}
          ref={ref}
          checked={value}
          onChange={handleChange}
          disabled={disabled}
          className={styles.input}
        />
        <span
          className={cn({
            [styles.checked]: value,
            [styles.disabled]: disabled,
          }, styles.circle)}
        />
      </div>
      <label
        htmlFor="radio"
        className={styles.label}
      >
        {text}
      </label>
    </button>
  );
});

const RadioButton = ({ ...props }) => (
  props.name ? (
    <InputController name={props.name} {...props}>
      <RadioButtonComponent name={props.name} />
    </InputController>
  ) : <RadioButtonComponent {...props} />
);

RadioButtonComponent.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

RadioButtonComponent.defaultProps = {
  text: '',
  disabled: false,
  value: false,
  className: null,
  onChange: null,
  name: null,
};

RadioButton.propTypes = {
  name: PropTypes.string,
};

RadioButton.defaultProps = {
  name: null,
};

export default memo(RadioButton);
