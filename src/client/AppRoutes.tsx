import { ComponentType, Suspense, lazy, Fragment } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import { PATHS } from '../common/enums';

const withSuspense = (
  WrappedComponent: ComponentType,
  requiresAuth = false
) => {
  const Wrapper = requiresAuth ? ProtectedRoute : Fragment;
  return (
    <Suspense fallback={<Loading full />}>
      <Wrapper>
        <WrappedComponent />
      </Wrapper>
    </Suspense>
  );
};

const MainPage = lazy(() => import('./app/layout/AppLayout'));
const Login = lazy(() => import('./features/auth/LoginPage'));
const Home = lazy(() => import('./features/home/HomePage'));
const Classes = lazy(() => import('./features/classes/ClassesPage'));
const Members = lazy(() => import('./features/members/MembersPage'));
const MemberDetail = lazy(
  () => import('./features/member-detail/MemberDetailPage')
);
const Visit = lazy(() => import('./features/visit/VisitPage'));
const Config = lazy(() => import('./features/config/ConfigPage'));
const Profile = lazy(() => import('./features/auth/ProfilePage'));
const Equipment = lazy(() => import('./pages/equipment'));
const EquipmentNew = lazy(() => import('./features/equipment/EquipmentPage'));
const DesignPage = lazy(() => import('./app/DesignPage'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={withSuspense(MainPage)}>
          <Route path={PATHS.HOME} element={withSuspense(Home, true)} />
          <Route path={PATHS.MEMBERS} element={withSuspense(Members, true)} />
          <Route
            path={`${PATHS.MEMBERS}/:code`}
            element={withSuspense(MemberDetail, true)}
          />
          <Route path={PATHS.CLASSES} element={withSuspense(Classes, true)} />
          <Route
            path={PATHS.EQUIPMENT}
            element={withSuspense(Equipment, true)}
          />
          <Route
            path="/equipment-new"
            element={withSuspense(EquipmentNew, true)}
          />
          <Route
            path={PATHS.CONFIGURATIONS}
            element={withSuspense(Config, true)}
          />
          <Route path={PATHS.PROFILE} element={withSuspense(Profile, true)} />
          {import.meta.env.DEV && (
            <Route path="/_design" element={withSuspense(DesignPage)} />
          )}
        </Route>
        <Route path={PATHS.LOGIN} element={withSuspense(Login)} />
        <Route path={PATHS.VISIT} element={withSuspense(Visit)} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
