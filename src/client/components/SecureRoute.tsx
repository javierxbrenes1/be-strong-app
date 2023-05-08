/* eslint-disable react/jsx-no-useless-fragment */
import { useNavigate } from 'react-router';
import { ReactNode } from 'react';
import useAuthStore from '../state/authState';
import { PATHS } from '../constants';

function SecureRoute(props: {
  children: ReactNode | ReactNode[];
}): JSX.Element {
  const isAuth = useAuthStore((state) => state.isAuth);
  console.log({ isAuth });
  const navigate = useNavigate();
  if (!isAuth) {
    navigate(PATHS.LOGIN, { replace: true });
    return <></>;
  }
  const { children } = props;
  return <>{children}</>;
}

export default SecureRoute;
