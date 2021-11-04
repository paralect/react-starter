import React, { useState } from 'react';

import DatePicker from './index';

export default {
  title: 'Components/Date Picker',
  component: DatePicker,
  argTypes: {
    label: { name: 'Label', control: 'text', defaultValue: 'Label' },
    placeholder: { name: 'Placeholder', control: 'text', defaultValue: 'Placeholder Text' },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    error: {
      message: { name: 'Error', control: 'text', defaultValue: null },
    },
  },
  args: {
    label: 'Label',
    disabled: false,
  },
};

const Template = (args) => {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '400px' }}>
      <DatePicker
        {...args}
        value={value}
        onChange={setValue}
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
