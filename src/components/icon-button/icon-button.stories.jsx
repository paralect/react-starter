import React from 'react';

import CloseIcon from 'static/icons/close.svg';
import CloseIconSmall from 'static/icons/close-small.svg';

import IconButton from './index';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    Icon: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    Icon: CloseIcon,
  },
};

const Template = (args) => <IconButton {...args} />;

export const Active = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const SmallIcon = Template.bind({});
SmallIcon.args = {
  Icon: CloseIconSmall,
  size: 's',
};
