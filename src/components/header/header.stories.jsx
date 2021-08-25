/* eslint-disable no-console */
import React from 'react';

import Header from './index';

const MENU_ITEMS = [
  {
    handler: () => console.log('Dashboard'),
    label: 'Dashboard',
    icon: 'lightning',
  },
  {
    handler: () => console.log('Subscription'),
    label: 'Subscription',
    icon: 'lightning',
  },
  {
    handler: () => console.log('Profile'),
    label: 'Profile',
    icon: 'lightning',
    options: [
      {
        handler: () => console.log('Dashboard'),
        label: 'Dashboard',
      },
      {
        handler: () => console.log('Subscription'),
        label: 'Subscription',
      },
      {
        handler: () => console.log('Profile'),
        label: 'Profile',
      },
    ],
  },
];

export default {
  title: 'Components/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  fullName: 'Bachrimchuk Unknown',
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  fullName: 'Bachrimchuk Unknown',
  avatarSrc: 'https://www.jigsawplanet.com/daniel1212?rc=face',
};

export const WithMenu = Template.bind({});
WithMenu.args = {
  menu: MENU_ITEMS,
  fullName: 'Bachrimchuk Unknown',
  avatarSrc: 'https://www.jigsawplanet.com/daniel1212?rc=face',
};
