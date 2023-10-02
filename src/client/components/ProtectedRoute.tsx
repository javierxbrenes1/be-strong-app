/* eslint-disable react/jsx-no-useless-fragment */
import { Navigate } from 'react-router';
import { ReactNode } from 'react';
import { useApolloClient } from '@apollo/client';
import useAuthStore from '../state/authState';
import { PATHS } from '../constants';
import CatalogsLoader from './CatalogsLoader';

function ProtectedRoute(props: { children: ReactNode | ReactNode[] }) {
  const isAuth = useAuthStore((state) => state.isAuth);
  const client = useApolloClient();

  if (!isAuth) {
    client.clearStore();
    return <Navigate to={PATHS.LOGIN} replace />;
  }
  const { children } = props;
  return <CatalogsLoader>{children}</CatalogsLoader>;
}

export default ProtectedRoute;
