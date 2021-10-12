import React, { memo } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import CloseIcon from 'static/icons/close.svg';

import Button from 'components/Button';
import IconButton from 'components/IconButton';

import styles from './Modal.pcss';

function Modal({
  children, title, subtitle, onSubmit, onCancel, noCancel, noSubmit, open, onClose,
  cancelButtonTitle, submitButtonTitle,
}) {
  return (
    <ReactModal
      isOpen={open}
      shouldFocusAfterRender
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      className={styles.modal}
      onRequestClose={onClose || onCancel}
      overlayClassName={styles.overlay}
    >
      <div className={styles.header}>
        <div className={styles.headerText}>
          {title && (
            <div className={styles.title}>
              {title}
            </div>
          )}
          {subtitle && (
            <div className={styles.subtitle}>
              {subtitle}
            </div>
          )}
        </div>
        <IconButton Icon={CloseIcon} onClick={onClose} />
      </div>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.footer}>
        {!noCancel && (
          <Button
            className={styles.button}
            onClick={onCancel || onClose}
            type="text"
          >
            {cancelButtonTitle}
          </Button>
        )}
        {!noSubmit && (
          <Button
            className={styles.button}
            onClick={onSubmit}
          >
            {submitButtonTitle}
          </Button>
        )}
      </div>
    </ReactModal>
  );
}

Modal.propTypes = {
  cancelButtonTitle: PropTypes.string,
  submitButtonTitle: PropTypes.string,
  subtitle: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  noCancel: PropTypes.bool,
  noSubmit: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
  title: PropTypes.string,
  open: PropTypes.bool,
};

Modal.defaultProps = {
  cancelButtonTitle: 'Cancel',
  submitButtonTitle: 'Submit',
  noCancel: false,
  noSubmit: false,
  subtitle: null,
  onSubmit: null,
  onCancel: null,
  children: null,
  onClose: null,
  title: null,
  open: false,
};

export default memo(Modal);
