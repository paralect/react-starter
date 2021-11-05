import React, {
  memo, forwardRef, useState, useRef,
} from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Datepicker, { CalendarContainer } from 'react-datepicker';

import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from 'static/icons';

import Input from 'components/Input/Input';
import IconButton from 'components/IconButton';
import InputController from 'components/InputController';

import { MONTHS } from 'helpers/constants';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.pcss';

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
    />
    {`${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
    <IconButton
      Icon={ArrowRightIcon}
      disabled={nextMonthButtonDisabled}
      onClick={increaseMonth}
    />
  </div>
);

const DatepickerInput = forwardRef(({ ...props }, ref) => {
  const inputRef = useRef(ref);

  return (
    <div className={styles.inputRoot}>
      <Input {...props} defaultOnChange={props.onChange} ref={inputRef} />
      <CalendarIcon
        className={cn({
          [styles.active]: props.isOpen,
          [styles.disabled]: props.disabled,
        }, styles.icon)}
        onMouseDown={() => {
          if (!props.isOpen) setTimeout(() => inputRef.current.focus(), 0);
          // replace with a more pretty solution
        }}
      />
    </div>
  );
});

const DatepickerComponent = ({
  label, disabled, error, placeholder, onChange, value, name,
}) => {
  const [isOpen, setOpen] = useState(false);

  const getDayStyle = (date) => (
    date?.toString() === value?.toString()
      ? styles.selectedDay
      : styles.day
  );
  const getWeekStyle = () => styles.weeks;

  return (
    <Datepicker
      name={name}
      renderCustomHeader={renderHeader}
      selected={value}
      disabled={disabled}
      placeholderText={placeholder}
      onChange={(date) => onChange(date)}
      onCalendarOpen={() => setOpen(true)}
      onCalendarClose={() => setOpen(false)}
      open={isOpen}
      setOpen={setOpen}
      customInput={(
        <DatepickerInput
          label={label}
          value={value}
          error={error}
          disabled={disabled}
          isOpen={isOpen}
        />
      )}
      showPopperArrow={false}
      popperClassName={styles.popper}
      calendarContainer={renderContainer}
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
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};

DatepickerComponent.defaultProps = {
  label: null,
  disabled: false,
  error: null,
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
  isOpen: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

DatepickerInput.defaultProps = {
  onChange: null,
};

export default memo(DatePicker);
