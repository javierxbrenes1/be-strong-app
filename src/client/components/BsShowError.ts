import { toast } from 'react-toastify';

function BsShowError(error: unknown, msg: string) {
  console.error(error);
  toast.error(msg, {
    position: 'top-right',
  });
}

export default BsShowError;
