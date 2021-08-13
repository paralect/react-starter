/* eslint-disable no-nested-ternary */
import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';

import Icon from 'components/icon';

import styles from './multi-select.styles.pcss';

const getCustomStyle = (isError) => ({
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled || state.isSelected ? 'var(--gray-light)' : 'var(--white)',
    color: 'var(--black)',
    backgroundImage: state.isSelected && 'url("data:image/svg+xml,%3Csvg width=\'14\' height=\'10\' viewBox=\'0 0 14 10\' fill=\'currentColor\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12.7763 0.501775C13.0514 0.746387 13.0762 1.16777 12.8316 1.44296L5.7205 9.44296C5.59399 9.58528 5.41265 9.66671 5.22223 9.66671C5.0318 9.66671 4.85047 9.58528 4.72396 9.44296L1.1684 5.44296C0.923789 5.16777 0.948576 4.74639 1.22376 4.50177C1.49895 4.25716 1.92033 4.28195 2.16495 4.55714L5.22223 7.99658L11.8351 0.557139C12.0797 0.28195 12.5011 0.257163 12.7763 0.501775Z\' fill=\'currentColor\' stroke=\'%232F37A6\' stroke-width=\'0.6\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E%0A")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top 50% right 16px',
    fontSize: '14px',
    fontWeight: state.isSelected ? '500' : '400',
    borderBottom: '1px solid var(--gray-light)',
    cursor: 'pointer',
    ':active': { backgroundColor: null },
    ':hover': { backgroundColor: 'var(--gray-light)' },
    ':last-child': { borderBottom: 'none' },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '2px',
    fontWeight: '400',
    border: '1px solid var(--gray)',
    borderRadius: '6px',
    boxShadow: 'none',
  }),
  control: (provided, state) => {
    const borderColor = state.isFocused
      ? '1px solid var(--blue) !important'
      : '1px solid var(--gray)';

    return ({
      ...provided,
      border: isError
        ? '1px solid var(--red)'
        : borderColor,
      borderRadius: '6px',
      fontWeight: '400',
      boxShadow: 'none',
      height: '40px',
      fontSize: '14px',
      ':hover': {
        border: state.isFocused
          ? '1px solid var(--blue) !important'
          : '1px solid var(--gray-dark) !important',
      },
    });
  },
  valueContainer: (provided) => ({
    ...provided,
    overflow: 'auto',
    maxHeight: '80px',
    padding: '6px 12px',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: '0',
    color: 'var(--gray-dark)',
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    ':hover': { color: 'var(--gray)' },
  }),
  indicatorSeparator: () => ({}),
  indicatorsContainer: (provided) => ({
    ...provided,
    width: '38px',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  multiValue: (provided, state) => ({
    ...provided,
    background: state.isDisabled
      ? 'var(--gray)'
      : 'var(--gray-light)',
    borderRadius: '6px',
    height: '24px',
    alignItems: 'center',
    padding: '4px 8px',
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    fontSize: '12px',
    color: state.isDisabled
      ? 'var(--gray-dark)'
      : 'var(--black)',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'var(--gray)',
    cursor: 'pointer',
    ':hover': { backgroundColor: 'none', color: 'var(--gray-dark)' },
  }),
});

const MultiSelect = ({
  options, label, disabled, error, className, onChange, value,
}) => {
  const MultiValueRemove = (props) => (
    <>
      {!disabled && (
        <components.MultiValueRemove {...props}>
          <Icon icon="close" />
        </components.MultiValueRemove>
      )}
    </>
  );

  return (
    <label
      htmlFor="select"
      className={cn(styles.label, className)}
    >
      {label && (
        <span
          className={cn(styles.title, className, {
            [styles.error]: error,
          })}
        >
          {label}
        </span>
      )}
      <ReactSelect
        value={value}
        name="multiSelect"
        className={cn(styles.select, {
          [styles.error]: error,
        })}
        classNamePrefix="select"
        controlHeight={80}
        isMulti
        isClearable={false}
        isSearchable
        blurInputOnSelect
        hideSelectedOptions={false}
        styles={getCustomStyle(error)}
        isFocused={false}
        isDisabled={disabled}
        closeMenuOnSelect={false}
        options={options}
        components={{ MultiValueRemove }}
        onChange={onChange}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </label>
  );
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

MultiSelect.defaultProps = {
  label: null,
  disabled: false,
  error: null,
  className: null,
};

export default memo(MultiSelect);
