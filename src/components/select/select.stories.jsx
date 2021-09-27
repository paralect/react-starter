import React, { useState } from 'react';

import Select from './index';

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

const optionsWithAvatar = [
  {
    value: 'John Doe',
    fullName: 'John Doe',
    avatarUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    label: 'John Doe',
  },
  {
    value: 'Oscar Steele',
    fullName: 'Oscar Steele',
    label: 'Oscar Steele',
  },
  {
    value: 'Casey Banks',
    fullName: 'Casey Banks',
    avatarUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    label: 'Casey Banks',
  },
  {
    value: 'Jayce Friedman',
    fullName: 'Jayce Friedman',
    label: 'Jayce Friedman',
  },
  {
    value: 'Ace Sharp',
    fullName: 'Ace Sharp',
    avatarUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    label: 'Ace Sharp',
  },
];

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    label: { name: 'Label', control: 'text', defaultValue: 'Label' },
    placeholder: { name: 'Placeholder', control: 'text', defaultValue: 'Select...' },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    error: {
      message: { name: 'Error', control: 'object', defaultValue: null },
    },
    name: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    label: 'Label',
    disabled: false,
  },
  decorators: [(Story) => <div style={{ maxWidth: '400px' }}><Story /></div>],
};

const Template = (args) => {
  const [value, setValue] = useState('');

  return (
    <Select
      value={value}
      onChange={setValue}
      options={options}
      {...args}
    />
  );
};

export const Active = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Error = Template.bind({});
Error.args = {
  error: {
    message: 'Error message',
  },
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  options: optionsWithAvatar,
  withAvatar: true,
};
