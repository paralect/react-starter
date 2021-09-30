import useToast from './useToast';

export default function useHandleError() {
  const { toastError } = useToast();

  return (e, setError) => {
    const { errors } = e.data || {};
    const { _global, ...errorsRest } = errors || {};

    if (_global) toastError(_global[0]);

    if (setError && errorsRest) {
      Object.keys(errorsRest).forEach((key) => {
        setError(key, { message: errorsRest[key].join(' ') }, { shouldFocus: true });
      });
    }
  };
}
