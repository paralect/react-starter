import React from 'react';

import ActionIcon from 'static/icons/action.svg';
import Sidebar from './index';

const MENU_ITEMS = [
  {
    label: 'Dashboard',
    icon: () => <ActionIcon />,
    path: '/dashboard',
  },
  {
    label: 'Subscriptions',
    icon: () => <ActionIcon />,
    path: '/subscriptions',
  },
  {
    label: 'Projects',
    icon: () => <ActionIcon />,
    path: '/projects',
  },
  {
    label: 'Profile',
    icon: () => <ActionIcon />,
    path: '/profie',
  },
];

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
};

const Template = (args) => {
  const [currentPage, setCurrentPage] = React.useState(MENU_ITEMS[0]);

  return (
    <Sidebar
      {...args}
      pages={MENU_ITEMS}
      currentPage={currentPage}
      onChange={setCurrentPage}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  fullName: 'Bachrimchuk Unknown',
};
