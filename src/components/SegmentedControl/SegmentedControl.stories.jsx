import React, { useState } from 'react';

import SegmentedControl from './SegmentedControl';

const options = [
  {
    label: 'Option',
    value: 'option-1',
  },
  {
    label: 'Option',
    value: 'option-2',
    isActive: true,
  },
  {
    label: 'Option',
    value: 'option-3',
  },
];

export default {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
};

const Template = (args) => {
  const [value, setValue] = useState(options[0]);

  return (
    <>
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={options}
        {...args}
      />
    </>
  );
};

export const Active = Template.bind({});
