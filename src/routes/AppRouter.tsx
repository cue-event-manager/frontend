import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { ROUTES } from "./routes";
import MainLayout from "../components/layouts/MainLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Route>

      <Route  element={<AuthLayout />}>
        <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
      </Route>

    </Routes>
  );
}
