import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";
import PublicLayout from "../layout/public/public-layout";
import ProtectedRoute from "./protected-route";
import PrivateLayout from "../layout/private/private-layout";
import Login from "../pages/public/login";
import Home from "../pages/private/home";
import Page2 from "../pages/private/page-2";

export default function AppRoutes() {
  const { user } = useAuthContext();
  const isAuthenticated = !!user;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Login />
            }
          />
        </Route>

        <Route
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PrivateLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/page-2" element={<Page2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
