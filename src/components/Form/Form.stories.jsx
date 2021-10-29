import React from 'react';
import { Provider } from 'react-redux';
import * as yup from 'yup';
import store from 'resources/store';

import Input from 'components/Input';
import Button from 'components/Button';
import CheckBox from 'components/Checkbox';
import Datepicker from 'components/DatePicker';
import MultiSelect from 'components/Multiselect';
import RadioButton from 'components/RadioGroup/RadioButton';
import Select from 'components/Select';
import Toggle from 'components/Toggle';
import TextArea from 'components/TextArea';
import Form from './index';

import styles from './storybook.form.pcss';

const options = [
  {
    value: '1',
    label: 'One',
  },
  {
    value: '2',
    label: 'Two',
  },
  {
    value: '3',
    label: 'Three',
  },
  {
    value: '4',
    label: 'Four',
  },
  {
    value: '5',
    label: 'Five',
  },
];

export default {
  title: 'Components/Form',
  component: Form,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

const defaultValues = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'bachrimchuk@gmail.com',
  datepicker: new Date(),
  textarea: 'text area text',
  multiSelect: [
    {
      value: '2',
      label: 'Two',
    },
    {
      value: '3',
      label: 'Three',
    },
  ],
  checkbox: true,
  radioButton: true,
  switch: true,
  select: {
    value: '2',
    label: 'Two',
  },
};

const schema = yup.object().shape({
  email: yup.string().email('Email format is incorrect.').required('Field is required.'),
  lastName: yup.string().required('Field is required.'),
  firstName: yup.string().required('Field is required.'),
  textarea: yup.string().required('Field is required.'),
});

export const Template = () => {
  const handleSubmit = (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <Form
      className={styles.form}
      validationSchema={schema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    >
      <div className={styles.column}>
        <Input
          label="First Name"
          placeholder="First Name"
          name="firstName"
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          name="lastName"
        />
        <Input
          label="Email"
          placeholder="Email"
          name="email"
        />
        <Select
          options={options}
          label="Select"
          placeholder="Select"
          name="select"
        />
        <Datepicker
          label="Datepicker"
          placeholder="Datepicker"
          name="datepicker"
        />
        <MultiSelect
          label="MultiSelect"
          placeholder="MultiSelect"
          name="multiSelect"
          options={options}
        />
        <TextArea
          label="TextArea"
          placeholder="TextArea"
          name="textarea"
        />
        <div className={styles.row}>
          <RadioButton
            label="RadioButton"
            placeholder="RadioButton"
            name="radioButton"
          />
          <CheckBox
            label="Checkbox"
            placeholder="Checkbox"
            name="checkbox"
          />
          <Toggle
            label="Toggle"
            placeholder="Toggle"
            name="Toggle"
          />
        </div>
      </div>
      <Button htmlType="submit"> Save </Button>

    </Form>
  );
};
