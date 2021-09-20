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
  title: 'Components/MultiSelect',
  component: MultiSelect,
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
  const [values, setValues] = useState();

  return (
    <div style={{ width: '400px' }}>
      <MultiSelect options={options} onChange={setValues} value={values} {...args} />
    </div>
  );
};

export const Active = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: {
    message: 'Error message',
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const DisabledWithOptions = Template.bind({});
DisabledWithOptions.args = {
  disabled: true,
  value: options,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'Placeholder',
  label: 'Label',
};
