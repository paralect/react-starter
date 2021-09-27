import React, { useState } from 'react';

import SearchField from './index';

export default {
  title: 'Components/Search Field',
  component: SearchField,
  argTypes: {
    placeholder: { name: 'Placeholder', control: 'text', defaultValue: 'Search' },
    maxLength: { name: 'Max Length', control: 'number', defaultValue: 150 },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    className: {
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
    disabled: false,
  },
  decorators: [(Story) => <div style={{ maxWidth: '260px' }}><Story /></div>],
};

const Template = (args) => {
  const [value, setValue] = useState('');

  return <SearchField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Active = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
