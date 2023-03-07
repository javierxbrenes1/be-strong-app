import { ComponentType, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { PATHS } from './constants';

const withSuspense = (WrappedComponent: ComponentType) => (
  <Suspense>
    <WrappedComponent />
  </Suspense>
);

const MainPage = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/home'));
const Classes = lazy(() => import('./pages/Classes'));
const Members = lazy(() => import('./pages/Members'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={withSuspense(MainPage)}>
          <Route path={PATHS.HOME} element={withSuspense(Home)} />
          <Route path={PATHS.MEMBERS} element={withSuspense(Members)} />
          <Route path={PATHS.CLASSES} element={withSuspense(Classes)} />
        </Route>
        <Route path={PATHS.LOGIN} element={withSuspense(Login)} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
