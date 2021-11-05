import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import InputComponent from './Input';

const Input = ({ ...props }) => {
  return props.control
    ? <InputControlled {...props} />
    : <InputComponent {...props} />;
};

const InputControlled = ({
  name, control, defaultValue, ...props
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({
      field: {
        onChange,
        onBlur,
        value,
        ref,
      },
    }) => (
      <InputComponent
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        {...props}
      />
    )}
  />
);

InputControlled.propTypes = {
  control: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
};

InputControlled.defaultProps = {
  defaultValue: '',
};

Input.propTypes = {
  control: PropTypes.shape({}),
};

Input.defaultProps = {
  control: null,
};

export default memo(Input);
