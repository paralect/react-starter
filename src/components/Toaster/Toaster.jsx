import React from 'react';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as toastSelectors from 'resources/toast/toast.selectors';
import { toastActions } from 'resources/toast/toast.slice';

import {
  CheckIcon, ErrorIcon, AlertIcon, CloseIcon,
} from 'static/icons';

import styles from './Toaster.pcss';

function getIconProps(type) {
  switch (type) {
    case 'success':
      return <CheckIcon />;
    case 'warning':
      return <CheckIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'info':
      return <AlertIcon />;
    default:
      return {};
  }
}

function RawToast() {
  const dispatch = useDispatch();

  const messages = useSelector(toastSelectors.selectMessages);

  const element = React.useRef(document.createElement('div'));

  React.useEffect(() => {
    const node = element.current;

    node.classList.add(styles.container);
    document.body.appendChild(node);

    return () => document.body.removeChild(node);
  }, []);

  function list() {
    return (
      <>
        {messages.map((m) => {
          const closeToast = () => {
            dispatch(toastActions.remove({ id: m.id }));
          };

          return (
            <div
              key={m.id}
              className={cn(styles.toast, styles[m.type])}
            >
              <div className={styles.main}>
                {getIconProps(m.type)}
                <span>{m.text}</span>
              </div>
              <CloseIcon onClick={closeToast} />
            </div>
          );
        })}
      </>
    );
  }

  return ReactDOM.createPortal(list(), element.current);
}

export const Toaster = React.memo(RawToast);
