import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantProfilePage from './pages/RestaurantProfilePage';
import DashboardAppPage from './pages/DashboardAppPage';
import { ProtectedLayout } from './layouts/auth/ProtectedLayout';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: <ProtectedLayout />,
      children: [
        {
          path: '/dashboard',
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to="/dashboard/restaurants" />, index: true },
            { path: 'app', element: <DashboardAppPage /> },
            { path: 'user', element: <UserPage /> },
            {
              path: 'restaurants',
              children: [
                { path: '', index: true, element: <RestaurantsPage /> },
                { path: ':id', element: <RestaurantProfilePage /> }
              ]
            },
            { path: 'blog', element: <BlogPage /> },
          ],
        },
      ]
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/restaurants" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
