import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';

import ArrowDownIcon from 'static/icons/arrow-down.svg';

import InputController from 'components/InputController';
import Avatar from 'components/Avatar';

import { getCustomStyle } from './helpers';

import styles from './Select.pcss';

const Option = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { label, fullName, avatarUrl } = props.data;

  return (
    <components.Option {...props}>
      <div className={styles.optionContainer}>
        <Avatar size="s" src={avatarUrl} fullName={fullName} />
        {label}
      </div>
    </components.Option>
  );
};

const ValueContainer = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { fullName, avatarUrl } = props.selectProps.value;
  const { children } = props;

  return (
    <>
      <div className={styles.avatarContainer}>
        {children[0]
          ? <Avatar size="s" src={avatarUrl} fullName={fullName} />
          : <Avatar size="s" src={null} fullName="" />}
      </div>
      <components.ValueContainer {...props} />
    </>
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDownIcon />
    </components.DropdownIndicator>
  );
};

const SelectComponent = ({
  options, label, disabled, error, placeholder, className, onChange, value, name, withAvatar,
}) => {
  return (
    <label
      htmlFor={name}
      className={cn(styles.label, className)}
    >
      {label && (
        <span
          className={
            cn({
              [styles.error]: error,
            }, styles.title, className)
          }
        >
          {label}
        </span>
      )}
      <ReactSelect
        name={name}
        className={cn(styles.select, {
          [styles.error]: error,
          [styles.withAvatar]: withAvatar,
        })}
        blurInputOnSelect
        classNamePrefix="select"
        hideSelectedOptions={false}
        styles={getCustomStyle(error)}
        isFocused={false}
        isDisabled={disabled}
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        components={withAvatar
          ? { Option, ValueContainer, DropdownIndicator }
          : { DropdownIndicator }}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </label>
  );
};

const Select = ({ ...props }) => (
  props.name ? (
    <InputController name={props.name} {...props}>
      <SelectComponent />
    </InputController>
  ) : <SelectComponent {...props} />
);

SelectComponent.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ]),
    label: PropTypes.string.isRequired,
  })),
  disabled: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  withAvatar: PropTypes.bool,
};

SelectComponent.defaultProps = {
  label: null,
  disabled: false,
  error: null,
  className: null,
  value: '',
  placeholder: 'Select...',
  name: '',
  options: [],
  onChange: () => {},
  withAvatar: false,
};

Select.propTypes = {
  name: PropTypes.string,
};

Select.defaultProps = {
  name: '',
};

Option.propTypes = {
  data: PropTypes.shape({
    avatarUrl: PropTypes.string,
    fullName: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

ValueContainer.propTypes = {
  selectProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
  children: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default memo(Select);
