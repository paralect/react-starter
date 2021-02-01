import React from 'react';

import Button from './index';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    children: { name: 'Text', control: 'text', defaultValue: 'Button' },
  },
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Button {...args}>{args.children}</Button>;

export const Green = Template.bind({});
Green.args = {
  color: 'green',
};

export const Blue = Template.bind({});
Blue.args = {
  color: 'blue',
};

export const Red = Template.bind({});
Red.args = {
  color: 'red',
};
