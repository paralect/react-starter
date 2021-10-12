import React from 'react';

import Input from './index';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: { name: 'Label', control: 'text', defaultValue: 'Label' },
    placeholder: { name: 'Placeholder', control: 'text', defaultValue: 'Placeholder Text' },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    maxLength: { name: 'Max Length', control: 'number' },
    error: {
      message: { name: 'Error', control: 'text', defaultValue: null },
    },
    defaultValue: { name: 'Default value', control: 'text' },
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
    type: {
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

const Template = (args) => <Input {...args} />;

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

export const Password = Template.bind({});
Password.args = {
  type: 'password',
};
