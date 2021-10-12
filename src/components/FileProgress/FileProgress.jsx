import React from 'react';
import PropTypes from 'prop-types';

import { CheckIcon, ErrorIcon, DocumentEmptyIcon } from 'static/icons';

import ProgressBar from 'components/ProgressBar';

import styles from './FileProgress.pcss';

const STATUSES = {
  SUCCESS: 'success',
  FAIL: 'fail',
  IN_PROGRESS: 'inProgress',
};

const STATUS_COLORS = {
  SUCCESS: '#219653',
  FAIL: '#eb5757',
};

const FileProgress = ({
  fileName, fileSize, percentage, status,
}) => {
  const renderStatus = () => {
    switch (status) {
      case STATUSES.SUCCESS:
        return <CheckIcon color={STATUS_COLORS.SUCCESS} />;

      case STATUSES.FAIL:
        return <ErrorIcon color={STATUS_COLORS.FAIL} />;

      default:
        return (
          <span className={styles.progressPercent}>
            {percentage}
            %
          </span>
        );
    }
  };

  return (
    <div className={styles.fileProgress}>
      <DocumentEmptyIcon />
      <div className={styles.main}>
        <span className={styles.fileName}>{fileName}</span>
        {status === STATUSES.IN_PROGRESS && <ProgressBar percentage={percentage} />}
        <span className={styles.fileSize}>{fileSize}</span>
      </div>
      {renderStatus()}
    </div>
  );
};

FileProgress.propTypes = {
  status: PropTypes.oneOf(Object.values(STATUSES)),
  fileName: PropTypes.string.isRequired,
  fileSize: PropTypes.string.isRequired,
  percentage: PropTypes.number,
};

FileProgress.defaultProps = {
  status: STATUSES.IN_PROGRESS,
  percentage: 0,
};

export default React.memo(FileProgress);
