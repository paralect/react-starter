import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Datepicker, { CalendarContainer } from 'react-datepicker';

import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from 'static/icons';

import Input from 'components/Input';
import IconButton from 'components/IconButton';
import InputController from 'components/InputController';

import { MONTHS } from 'helpers/constants';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.pcss';

const iconStyle = { transform: 'rotate(180deg)' };

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
      Icon={ArrowLeftIcon}
      disabled={prevMonthButtonDisabled}
      onClick={decreaseMonth}
      style={iconStyle}
    />
    {`${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
    <IconButton
      Icon={ArrowRightIcon}
      disabled={nextMonthButtonDisabled}
      onClick={increaseMonth}
    />
  </div>
);

const DatepickerInput = forwardRef(({ onClick, ...props }, ref) => (
  <div className={styles.inputRoot}>
    <Input {...props} name="" ref={ref} />
    <CalendarIcon className={styles.icon} onClick={onClick} />
  </div>
));

const DatepickerComponent = ({
  label, disabled, errors, placeholder, onChange, value, name,
}) => {
  const getDayStyle = (date) => (
    date.toString() === value.toString()
      ? styles.selectedDay
      : styles.day
  );
  const getWeekStyle = () => styles.weeks;

  return (
    <Datepicker
      name={name}
      renderCustomHeader={renderHeader}
      value={value}
      selected={value}
      disabled={disabled}
      placeholderText={placeholder}
      onChange={onChange}
      customInput={(
        <DatepickerInput
          name={name}
          label={label}
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

const DatePicker = ({ ...props }) => (
  props.name ? (
    <InputController name={props.name} {...props}>
      <DatepickerComponent />
    </InputController>
  ) : <DatepickerComponent {...props} />
);

DatepickerComponent.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};

DatepickerComponent.defaultProps = {
  label: null,
  disabled: false,
  errors: [],
  value: null,
  placeholder: '',
  name: '',
  onChange: () => {},
};

DatePicker.propTypes = {
  name: PropTypes.string,
};

DatePicker.defaultProps = {
  name: '',
};

DatepickerInput.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default memo(DatePicker);
