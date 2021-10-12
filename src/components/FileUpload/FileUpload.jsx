import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import FileUploadIcon from 'static/icons/file-upload.svg';
import styles from './FileUpload.pcss';

const ICON_COLOR = '#808080';
const ICON_COLOR_LIGHT = '#D4D8DD';

const FileUpload = ({
  onFileSelect, accept, error, ...rest
}) => {
  const handleFileSelect = (params) => {
    if (onFileSelect) {
      onFileSelect(params);
    }
  };

  const {
    getRootProps, getInputProps, isDragActive, open,
  } = useDropzone({
    onDrop: handleFileSelect,
    noClick: true,
    noDragEventsBubbling: true,
    accept,
    ...rest,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          {
            [styles.dragActive]: isDragActive,
            [styles.error]: error,
          },
          styles.dropzone,
        )}
      >
        <input {...getInputProps({ })} />
        <FileUploadIcon color={isDragActive ? ICON_COLOR : ICON_COLOR_LIGHT} />
        <div className={styles.fileUploadText}>
          Drag and drop or
          {' '}
          <button
            type="button"
            onClick={open}
            className={styles.linkButton}
          >
            browse
          </button>
          {' '}
          files to upload
        </div>
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
    </>
  );
};

FileUpload.propTypes = {
  onFileSelect: PropTypes.func,
  accept: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

FileUpload.defaultProps = {
  onFileSelect: undefined,
  accept: undefined,
  error: undefined,
  className: undefined,
};

export default React.memo(FileUpload);
