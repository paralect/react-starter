import { useToasts } from 'react-toast-notifications';

export function useToast() {
  const { addToast, ...rest } = useToasts();

  return {
    ...rest,
    success: (content, options = {}) => addToast(content, { ...options, appearance: 'success' }),
    error: (content, options = {}) => addToast(content, { ...options, appearance: 'error' }),
    warning: (content, options = {}) => addToast(content, { ...options, appearance: 'warning' }),
    info: (content, options = {}) => addToast(content, { ...options, appearance: 'info' }),
  };
}
