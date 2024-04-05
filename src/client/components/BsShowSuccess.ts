import { toast } from 'react-toastify';

function BsShowSuccess(msg: string) {
  toast.success(msg, {
    position: 'top-right',
  });
}

export default BsShowSuccess;
