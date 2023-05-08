import { ComponentType, Suspense, lazy, Fragment } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { PATHS } from './constants';
import SecureRoute from './components/SecureRoute';

const withSuspense = (
  WrappedComponent: ComponentType,
  requiresAuth = false
) => {
  const AuthComp = requiresAuth ? SecureRoute : Fragment;
  return (
    <Suspense>
      <AuthComp>
        <WrappedComponent />
      </AuthComp>
    </Suspense>
  );
};

const MainPage = lazy(() => import('./components/MainLayout'));
const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import('./pages/home'));
const Classes = lazy(() => import('./pages/classes'));
const Members = lazy(() => import('./pages/members'));
const Member = lazy(() => import('./pages/member'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={withSuspense(MainPage)}>
          <Route path={PATHS.HOME} element={withSuspense(Home, true)} />
          <Route path={PATHS.MEMBERS} element={withSuspense(Members, true)} />
          <Route
            path={`${PATHS.MEMBERS}/:code`}
            element={withSuspense(Member, true)}
          />
          <Route path={PATHS.CLASSES} element={withSuspense(Classes, true)} />
        </Route>
        <Route path={PATHS.LOGIN} element={withSuspense(Login)} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
