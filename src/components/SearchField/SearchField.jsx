import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { SearchIcon } from 'static/icons';

import styles from './SearchField.pcss';

function SearchField({
  value, maxLength, disabled, onChange, placeholder, className,
}) {
  return (
    <div className={cn({
      [styles.disabled]: disabled,
    }, styles.search, className)}
    >
      <SearchIcon className={styles.icon} />
      <input
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}

SearchField.propTypes = {
  value: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

SearchField.defaultProps = {
  value: '',
  maxLength: 150,
  disabled: false,
  placeholder: 'Search',
  className: null,
};

export default SearchField;
