export const getToasterMessages = ({ toast }, filter) => {
  return toast.messages.filter((message) => {
    return filter === 'all' || filter === message.type;
  });
};
