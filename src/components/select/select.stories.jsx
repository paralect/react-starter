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
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
    error: {
      message: { name: 'Error', control: 'text', defaultValue: null },
    },
    label: { name: 'Label', control: 'text', defaultValue: 'Label' },
  },
  args: {
    disabled: false,
  },
};

const Template = (args) => {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '400px' }}>
      <Select
        value={value}
        onChange={setValue}
        options={options}
        {...args}
      />
    </div>
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

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'Placeholder',
  label: 'Label',
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  options: optionsWithAvatar,
  withAvatar: true,
};
