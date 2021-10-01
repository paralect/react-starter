import React, { useState } from 'react';

import RadioButton from './index';

export default {
  title: 'Components/Radio button',
  component: RadioButton,
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    text: 'text',
  },
  args: {
    text: 'Text',
    disabled: false,
  },
};

const Template = (args) => {
  const { value } = args;
  const [isChecked, setChecked] = useState(value);

  const handleChange = () => setChecked(!isChecked);

  return (
    <RadioButton {...args} value={isChecked} onChange={handleChange} />
  );
};

export const Active = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
