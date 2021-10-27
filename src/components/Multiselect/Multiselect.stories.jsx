import React, { useState } from 'react';

import MultiSelect from './index';

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
  title: 'Components/Multiselect',
  component: MultiSelect,
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
  const [values, setValues] = useState();

  return <MultiSelect options={options} onChange={setValues} value={values} {...args} />;
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
