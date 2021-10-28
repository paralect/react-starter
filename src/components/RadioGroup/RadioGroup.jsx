import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

import styles from './RadioGroup.pcss';

const RadioGroup = ({
  // eslint-disable-next-line react/prop-types
  label, options, value, onChange, disabled, className,
}) => {
  const [radioGroupOptions, setRadioGroupOptions] = useState(options);
  // add proptypes for onChange
  useEffect(() => {
    setRadioGroupOptions(options.map((option) => {
      const newOption = { ...option };
      newOption.isActive = option.value === value.value;
      return newOption;
    }));
  }, [value.value, options]);

  const handleClick = useCallback((index) => onChange(options[index]), [onChange, options]);

  return (
    <div
      className={cn({
        [styles.disabled]: disabled,
      }, styles.container, className)}
    >
      <label htmlFor="radio" className={styles.label}>{label}</label>
      <div className={styles.radioButtonsContainer}>
        {radioGroupOptions.map((option, index) => (
          <RadioButton
            key={option.value}
            text={option.label}
            value={option.isActive}
            disabled={option.isDisabled}
            className={styles.radioButton}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

RadioGroup.defaultProps = {
  label: null,
  options: null,
  value: null,
  disabled: false,
  className: null,
};

export default memo(RadioGroup);
