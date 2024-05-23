const { notifyWarning, notifyError } = require('../components/Common/Notify');

export const useNotification = (
  isError,
  error,
  isSuccess,
  succeedFunction,
  router
) => {
  if (isError) {
    const { status, data } = error?.response;

    if (status === 400) {
      notifyWarning(data?.error);
      setTimeout(() => {
        router.push('/login');
      }, 3500);
    } else if (status === 401) {
      notifyWarning(data?.error);
    } else if (status === 404 || status === 500) {
      notifyError(data?.error);
    }
  } else if (isSuccess && !!succeedFunction) {
    succeedFunction();
  }
};
