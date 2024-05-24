import { toast } from 'react-toastify';

export const notifySuccess = successNotify => toast.success(successNotify);
export const notifyWarning = warningNotify => toast.warning(warningNotify);
export const notifyError = errorNotify => toast.warning(errorNotify);
