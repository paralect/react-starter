import React, { useState } from 'react';

import SegmentedControl from './SegmentedControl';

const options = [
  {
    label: 'Option 1',
    value: 'option-1',
  },
  {
    label: 'Option 2',
    value: 'option-2',
  },
  {
    label: 'Option 3',
    value: 'option-3',
  },
  {
    label: 'Option 4',
    value: 'option-4',
  },
  {
    label: 'Option 5',
    value: 'option-5',
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
