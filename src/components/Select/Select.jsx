import React, { forwardRef, memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';

import ArrowDownIcon from 'static/icons/arrow-down.svg';

import { getCustomStyle } from './helpers';

import styles from './Select.pcss';
import { CloseSmallIcon } from '../../static/icons';

const Select = forwardRef(({
  isMulti, value, onChange, options, name, label, placeholder, disabled, error, className,
}, ref) => {
  const MultiValueRemove = (props) => (
    <>
      {!disabled && (
        <components.MultiValueRemove {...props}>
          <CloseSmallIcon />
        </components.MultiValueRemove>
      )}
    </>
  );
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDownIcon />
      </components.DropdownIndicator>
    );
  };

  return (
    <div className={cn(styles.container, className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn({
            [styles.error]: error,
          }, styles.label)}
        >
          {label}
        </label>
      )}
      <ReactSelect
        value={value}
        onChange={onChange}
        options={options}
        name={name}
        placeholder={placeholder}
        isDisabled={disabled}
        isMulti={isMulti}
        classNamePrefix="select"
        hideSelectedOptions={false}
        isFocused={false}
        isClearable={false}
        styles={getCustomStyle(error)}
        components={{ MultiValueRemove, DropdownIndicator }}
        className={cn({
          [styles.error]: error,
        }, styles.select)}
        ref={ref}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});

Select.propTypes = {
  isMulti: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ]),
    label: PropTypes.string.isRequired,
  })),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
};

Select.defaultProps = {
  isMulti: false,
  value: null,
  onChange: null,
  options: [],
  name: null,
  label: null,
  placeholder: 'Select...',
  disabled: false,
  error: null,
  className: null,
};

export default memo(Select);
