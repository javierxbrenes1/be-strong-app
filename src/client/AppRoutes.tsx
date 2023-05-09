import { ComponentType, Suspense, lazy, Fragment } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { PATHS } from './constants';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';

const withSuspense = (
  WrappedComponent: ComponentType,
  requiresAuth = false
) => {
  const Wrapper = requiresAuth ? ProtectedRoute : Fragment;
  return (
    <Suspense fallback={<Loading />}>
      <Wrapper>
        <WrappedComponent />
      </Wrapper>
    </Suspense>
  );
};

const MainPage = lazy(() => import('./components/MainLayout'));
const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import('./pages/home'));
const Classes = lazy(() => import('./pages/classes'));
const Members = lazy(() => import('./pages/members'));
const Member = lazy(() => import('./pages/member'));
const Visit = lazy(() => import('./pages/visit'));

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
        <Route path={PATHS.VISIT} element={withSuspense(Visit)} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
