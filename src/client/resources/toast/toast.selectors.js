export const getToasterMessages = ({ toast }, filter = 'all') => {
  return toast.messages.filter((message) => {
    return filter === 'all' || filter === message.type;
  });
};
