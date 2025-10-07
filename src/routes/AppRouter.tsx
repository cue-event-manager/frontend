import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { ROUTES } from "./routes";
import MainLayout from "../components/layouts/MainLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import GuestGuard from "@/guards/GuestGuard";
import AuthGuard from "@/guards/AuthGuard";
import ProfilePage from "@/pages/ProfilePage";
import TermsAndConditionsPage from "@/pages/TermsAndConditionsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.TERMS_AND_CONDITIONS} element={<TermsAndConditionsPage />} />

        <Route element={<AuthGuard />} >
          <Route path={ROUTES.PROFILE} element={<ProfilePage/>} />
        </Route>

      </Route>

      <Route element={<GuestGuard />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
