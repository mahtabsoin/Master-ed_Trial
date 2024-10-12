// components/ui/use-toast.ts
import { toast as toastify } from 'react-toastify'; // or your preferred toast library

export const toast = (options) => {
  return toastify(options);
};