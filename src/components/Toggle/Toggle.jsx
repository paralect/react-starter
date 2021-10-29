import React, { forwardRef, memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import InputController from 'components/InputController';

import styles from './Toggle.pcss';

const ToggleComponent = forwardRef(({
  text, disabled, value, onChange, className, name,
}, ref) => (
  <button
    type="button"
    onClick={onChange}
    className={cn({
      [styles.disabled]: disabled,
    }, styles.container, className)}
  >
    <label
      htmlFor="checkbox"
      className={styles.label}
    >
      {text}
    </label>
    <div
      className={cn({
        [styles.checked]: value,
        [styles.disabled]: disabled,
      }, styles.toggle)}
    >
      <input
        type="checkbox"
        name={name}
        ref={ref}
        checked={value}
        onChange={onChange}
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
  </button>
));

const Toggle = ({ ...props }) => (
  props.name ? (
    <InputController name={props.name} {...props}>
      <ToggleComponent name={props.name} />
    </InputController>
  ) : <ToggleComponent {...props} />
);

ToggleComponent.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

ToggleComponent.defaultProps = {
  text: '',
  disabled: false,
  value: false,
  className: null,
  onChange: null,
  name: null,
};

Toggle.propTypes = {
  name: PropTypes.string,
};

Toggle.defaultProps = {
  name: null,
};

export default memo(Toggle);
