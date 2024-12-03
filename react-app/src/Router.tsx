import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/auth";
import { AdminProvider } from "./context/AdminContext";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserLogDetails from "./pages/user/UserLogDetails";
import AddLogPage from "./pages/user/AddLogPage";
import EditLogPage from "./pages/user/EditLogPage";
import UserActivityPage from "./pages/admin/UserActivityPage";
import SymptomPatternsPage from "./pages/admin/SymptomPatternsPage";
import SymptomsByLocationPage from "./pages/admin/SymptomsByLocationPage";
import AddProviderProfile from "./pages/provider/AddProviderProfile";
import EditProviderProfile from "./pages/provider/EditProviderProfile";
import ViewSymptomLogs from "./pages/provider/ViewSymptomLogs";

const Router = () => {
  const AuthProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const AdminProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const { isAuthenticated, user } = useAuth();
    return isAuthenticated && user?.role === "ADMIN" ? (
      <AdminProvider>{element}</AdminProvider>
    ) : (
      <Navigate to="/login" />
    );
  };

  const ProviderOrAdminProtectedRoute = ({
    element,
  }: {
    element: JSX.Element;
  }) => {
    const { isAuthenticated, user } = useAuth();
    return isAuthenticated &&
      (user?.role === "PROVIDER" || user?.role === "ADMIN") ? (
      element
    ) : (
      <Navigate to="/login" />
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<MainLayout />}>
        <Route index element={<AuthProtectedRoute element={<HomePage />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/log/:id"
          element={<AuthProtectedRoute element={<UserLogDetails />} />}
        />
        <Route
          path="/new-log"
          element={<AuthProtectedRoute element={<AddLogPage />} />}
        />
        <Route
          path="/edit-log"
          element={<AuthProtectedRoute element={<EditLogPage />} />}
        />
        <Route
          path="/activity/users"
          element={<AdminProtectedRoute element={<UserActivityPage />} />}
        />
        <Route
          path="/symptoms/location"
          element={<AdminProtectedRoute element={<SymptomsByLocationPage />} />}
        />
        <Route
          path="/symptoms/patterns"
          element={<AdminProtectedRoute element={<SymptomPatternsPage />} />}
        />
        <Route
          path="/add-profile"
          element={<AuthProtectedRoute element={<AddProviderProfile />} />}
        />
        <Route
          path="/edit-profile"
          element={<AuthProtectedRoute element={<EditProviderProfile />} />}
        />
        <Route
          path="/view-logs"
          element={
            <ProviderOrAdminProtectedRoute element={<ViewSymptomLogs />} />
          }
        />
      </Route>,
    ])
  );

  return <RouterProvider router={router} />;
};
export default Router;
