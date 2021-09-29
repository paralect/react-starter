import React, { forwardRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import InputController from 'components/InputController';

import styles from './Checkbox.pcss';

const CheckBoxComponent = forwardRef(({
  text, disabled, value, onChange, className,
}, ref) => (
  <>
    <button
      type="button"
      onClick={onChange}
      className={cn({
        [styles.container]: true,
        [styles.disabled]: disabled,
      }, className)}
    >
      <input
        name={text}
        className={cn(styles.checkbox)}
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={onChange}
        ref={ref}
      />
      <label
        htmlFor={text}
        className={styles.checkboxLabel}
      >
        <span className={styles.checkboxText}>{text}</span>
      </label>
    </button>
  </>
));

const CheckBox = ({ ...props }) => (
  props.name ? (
    <InputController name={props.name} {...props}>
      <CheckBoxComponent />
    </InputController>
  ) : <CheckBoxComponent {...props} />
);

CheckBoxComponent.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

CheckBoxComponent.defaultProps = {
  text: '',
  disabled: false,
  value: false,
  className: null,
  onChange: null,
};

CheckBox.propTypes = {
  name: PropTypes.string,
};

CheckBox.defaultProps = {
  name: '',
};

export default CheckBox;
