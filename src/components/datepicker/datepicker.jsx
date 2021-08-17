import React, { memo } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { CalendarContainer } from 'react-datepicker';

import Input from 'components/input';
import IconButton from 'components/icon-button';
import Icon from 'components/icon';
import { MOUNTHS } from 'helpers/constants';

import 'react-datepicker/dist/react-datepicker.css';

import styles from './datepicker.styles.pcss';

const renderContainer = ({ children }) => (
  <CalendarContainer className={styles.container}>
    {children}
  </CalendarContainer>
);

const renderHeader = ({
  date, decreaseMonth, increaseMonth,
  prevMonthButtonDisabled, nextMonthButtonDisabled,
}) => (
  <div className={styles.header}>
    <IconButton
      onClick={decreaseMonth}
      style={{ transform: 'rotate(180deg)' }}
      icon="arrowRight"
      disabled={prevMonthButtonDisabled}
    />
    {`${MOUNTHS[date.getMonth()]} ${date.getFullYear()}`}
    <IconButton
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      icon="arrowRight"
    />
  </div>
);

const DatepickerInput = ({ ...props }) => (
  <div className={styles.inputRoot}>
    <Input {...props} />
    <Icon
      icon="calendar"
      className={styles.icon}
    />
  </div>
);

const Datepicker = ({
  label, disabled, errors, placeholder, onChange, value,
}) => {
  const getDayStyle = (date) => (
    date.toString() === value.toString()
      ? styles.selectedDay
      : styles.day
  );

  const getWeekStyle = () => styles.weeks;

  return (
    <DatePicker
      name="select"
      renderCustomHeader={renderHeader}
      placeholder={placeholder}
      value={value}
      selected={value}
      disabled={disabled}
      placeholderText={placeholder}
      onChange={onChange}
      customInput={(
        <DatepickerInput
          label={label}
          disabled={disabled}
          errors={errors}
          placeholder={placeholder}
        />
      )}
      calendarContainer={renderContainer}
      popperClassName={styles.popper}
      wrapperClassName={styles.wrapper}
      showPopperArrow={false}
      weekDayClassName={getWeekStyle}
      dayClassName={getDayStyle}
    />
  );
};

Datepicker.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Datepicker.defaultProps = {
  label: null,
  disabled: false,
  errors: [],
  value: '',
  placeholder: '',
};

export default memo(Datepicker);
