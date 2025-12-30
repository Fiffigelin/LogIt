import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";
import PublicLayout from "../layout/public/public-layout";
import ProtectedRoute from "./protected-route";
import PrivateLayout from "../layout/private/private-layout";
import Login from "../pages/public/login";

export default function AppRoutes() {
  const { user } = useAuthContext();
  const isAuthenticated = !!user;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PrivateLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route path="/home" element={<DashboardHome />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
