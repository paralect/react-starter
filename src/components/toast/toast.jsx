import React from 'react';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as toastSelectors from 'resources/toast/toast.selectors';
import { toastActions } from 'resources/toast/toast.slice';

import RoundCheckIcon from 'static/icons/round-check.svg';
import RoundErrorIcon from 'static/icons/round-error.svg';
import RoundInfoIcon from 'static/icons/round-info.svg';
import CloseIcon from 'static/icons/close.svg';

import styles from './toast.styles.pcss';

function getIconProps(type) {
  switch (type) {
    case 'success':
      return <RoundCheckIcon />;
    case 'warning':
      return <RoundCheckIcon />;
    case 'error':
      return <RoundErrorIcon />;
    case 'info':
      return <RoundInfoIcon />;
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

export const Toast = React.memo(RawToast);
