import React, {
  memo, useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import cn from 'classnames';

import PropTypes from 'prop-types';
import styles from './SegmentedControl.pcss';

const SegmentedControl = ({
  // eslint-disable-next-line react/prop-types
  value, onChange, options,
}) => {
  const containerRef = useRef(null);
  const segmentRef = useRef(null);

  const [segmentedControls, setSegmentedControls] = useState(options);
  const [segmentWidth, setSegmentWidth] = useState(0);

  useLayoutEffect(() => {
    document.onreadystatechange = () => setSegmentWidth(containerRef.current?.offsetWidth);
  }, [containerRef.current?.offsetWidth]);

  useEffect(() => {
    const indexOfActiveSegment = options.findIndex((option) => option.value === value.value);

    setSegmentedControls(options.map((option) => {
      const newOption = { ...option };
      newOption.isActive = option.value === value.value;
      return newOption;
    }));

    segmentRef.current.style.transform = `translateX(${
      (containerRef.current?.offsetWidth / options.length) * indexOfActiveSegment
      // (containerWidth / countOfSegments) * indexOfActiveSegment
    }px)`;
  }, [value.value, options, segmentWidth]);

  const handleClick = useCallback((index) => onChange(options[index]), [onChange, options]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer} ref={containerRef}>
        <div
          className={styles.segment_mask}
          style={{ width: `calc((100% / ${options.length}) - 2px)` }}
          ref={segmentRef}
        />
        {segmentedControls.map((option, index) => (
          // eslint-disable-next-line
          <div
            key={option.value}
            className={cn({
              [styles.active]: option.isActive,
            }, styles.segment)}
            onClick={() => handleClick(index)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

SegmentedControl.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
};

SegmentedControl.defaultProps = {
  options: null,
  value: null,
};

export default memo(SegmentedControl);
