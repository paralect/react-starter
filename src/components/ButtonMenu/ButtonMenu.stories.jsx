/* eslint-disable no-console */
import React from 'react';

import CopyIcon from 'static/icons/copy.svg';

import ButtonMenu from './index';

const OPTIONS = [{
  label: 'Option 1',
  handler: () => console.log('1'),
  icon: () => <CopyIcon />,
},
{
  label: 'Option 2',
  handler: () => console.log('2'),
  icon: () => <CopyIcon />,
},
{
  label: 'Option 3',
  handler: () => console.log('3'),
},
{
  label: 'Option 4',
  handler: () => console.log('4'),
},
{
  label: 'Option 5',
  handler: () => console.log('5'),
},
];

export default {
  title: 'Components/Button Menu',
  component: ButtonMenu,
  argTypes: {
    onClick: { action: 'clicked' },
    children: { name: 'Text', control: 'text', defaultValue: 'ButtonMenu' },
  },
};

const Template = ({ ...args }) => <ButtonMenu {...args}>{args.children}</ButtonMenu>;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  options: OPTIONS,
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  options: OPTIONS,
};

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  options: OPTIONS,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  options: OPTIONS,
};
