import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from 'components/Input';
import DatePicker from 'components/DatePicker';
import Select from 'components/Select';
import TextArea from 'components/TextArea';
import Button from 'components/Button';

import styles from './sandbox.stories.pcss';

const options = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
  {
    label: 'Option 3',
    value: '3',
  },
];

const schema = yup.object().shape({});

export default {
  title: 'Sandbox/Example',
  decorators: [(Story) => <div style={{ maxWidth: '350px' }}><Story /></div>],
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
      input: '',
      date: '',
      textarea: '',
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Input"
        name="input"
        placeholder="Input"
        control={control}
        error={errors.input}
      />
      <DatePicker
        label="Date"
        name="date"
        placeholder="mm/dd/yyyy"
        control={control}
        error={errors.date}
      />
      <Select
        label="Select"
        name="select"
        placeholder="Select"
        options={options}
        control={control}
        error={errors.select}
      />
      <Select
        label="Multiselect"
        name="multiselect"
        placeholder="Multiselect"
        options={options}
        control={control}
        error={errors.multiselect}
        isMulti
      />
      <TextArea
        label="TextArea"
        name="textarea"
        placeholder="TextArea"
        control={control}
        error={errors.textarea}
      />
      <Button htmlType="submit">Save</Button>
    </form>
  );
};
