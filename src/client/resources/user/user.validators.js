import * as yup from 'yup';
import _ from 'lodash';

import { validate, validateField } from 'helpers/validation';


const schema = yup.object({
  firstName: yup.string()
    .trim()
    .required('Your first name must be longer than 1 letter'),
  lastName: yup.string()
    .trim()
    .required('Your last name must be longer than 1 letter'),
  email: yup.string()
    .trim()
    .lowercase()
    .required('Email is required')
    .email('Please enter a valid email address'),
});

export const validateUserField = (data, field) => {
  return validateField(data, field, schema);
};

export const validateUser = async (data) => {
  const result = await validate(data, schema);
  const isValid = _.isEmpty(result.errors);

  return {
    errors: {
      ...result.errors,
      _global: ['Validation Error.'],
    },
    isValid,
  };
};
