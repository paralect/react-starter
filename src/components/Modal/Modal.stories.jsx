import React, { useState } from 'react';

import { MoreIcon } from 'static/icons';

import Button from 'components/Button';

import styles from './Modal.stories.pcss';

import Modal from './index';
import IconButton from '../IconButton/IconButton';

export default {
  title: 'Components/Modal',
  component: Modal,
};

export const Default = ({ ...args }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => setIsOpen(false);
  const handleModalOpen = () => setIsOpen(true);

  return (
    <>
      <Button onClick={handleModalOpen}>Open modal</Button>
      <Modal isOpen={isOpen} onRequestClose={handleModalClose} {...args}>

        <div className={styles.container}>
          <div className={styles.head}>
            <span>
              <h3>Heading</h3>
              <div className={styles.subheading}>Subheading</div>
            </span>
            <IconButton Icon={MoreIcon} className={styles.moreIcon} />
          </div>
          <div className={styles.body}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled
            it to make a type specimen book.
          </div>
          <div className={styles.buttonContainer}>
            <Button
              type="text"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleModalClose}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
