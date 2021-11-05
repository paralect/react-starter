import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from 'components/Input';
import DatePicker from 'components/DatePicker';
import Button from 'components/Button';

import styles from './sandbox.stories.pcss';

const schema = yup.object().shape({
  fullName: yup.string().required('This field is required'),
  date: yup.date().required('This field is required'),
});

export default {
  title: 'Sandbox/Example',
  decorators: [(Story) => <div style={{ maxWidth: '400px' }}><Story /></div>],
};

export const Template = () => {
  const {
    handleSubmit, formState: { errors }, control, reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
    reset({
      fullName: '',
      date: '',
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Full Name"
        name="fullName"
        placeholder="Full Name"
        control={control}
        error={errors.fullName}
      />
      <DatePicker
        label="Date"
        name="date"
        placeholder="mm/dd/yyyy"
        control={control}
        error={errors.date}
      />
      <Button htmlType="submit">
        Save
      </Button>
    </form>
  );
};
