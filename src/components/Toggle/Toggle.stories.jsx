import React, { useState } from 'react';

import Toggle from './index';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    text: { name: 'Text', control: 'text', defaultValue: 'Text' },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    name: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    text: 'Text',
    disabled: false,
  },
};

const Template = (args) => {
  const [isChecked, setChecked] = useState(false);

  const handleChange = () => setChecked(!isChecked);

  return (
    <Toggle {...args} value={isChecked} onChange={handleChange} />
  );
};

export const Active = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
