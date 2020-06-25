import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import * as toastSelectors from 'resources/toast/toast.selectors';
import * as toastActions from 'resources/toast/toast.actions';

import styles from './toast.styles.pcss';

function Toast() {
  const dispatch = useDispatch();
  const messages = useSelector(toastSelectors.getToasterMessages);

  const element = React.useRef(document.createElement('div'));
  React.useEffect(() => {
    const node = element.current;
    node.classList.add(styles.wrap);
    document.body.appendChild(node);
    return () => document.body.removeChild(node);
  }, []);

  const remove = React.useCallback((id) => {
    dispatch(toastActions.removeMessage(id));
  }, [dispatch]);

  const handleClick = React.useCallback((id) => {
    return () => remove(id);
  }, [remove]);

  const handleKeyDown = React.useCallback((id) => {
    return (event) => {
      if (event.keyCode === 13) {
        remove(id);
      }
    };
  }, [remove]);

  const toasts = React.useMemo(() => {
    return messages.map((message, index) => {
      const text = !message.text || typeof message.text === 'string'
        ? message.text
        : message.text.join(', ');

      return (
        <div
          key={message.id}
          role="button"
          tabIndex={index}
          className={cn(styles.message, styles[message.type])}
          onClick={handleClick(message.id)}
          onKeyDown={handleKeyDown(message.id)}
        >
          <div>
            {message.title && (
              <div className={styles.title}>
                {message.title}
              </div>
            )}
            <div>
              {text}
            </div>
          </div>
        </div>
      );
    });
  }, [handleClick, handleKeyDown, messages]);

  return ReactDOM.createPortal(toasts, element.current);
}

export default React.memo(Toast);
