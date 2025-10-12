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
import RecoverPasswordPage from "@/pages/RecoverPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPasge";
import RoleGuard from "@/guards/RoleGuard";
import { RoleConstant } from "@/domain/role/RoleConstant";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminUsersPage from "@/pages/AdminUsersPage";
import AdminSpaceTypesPage from "@/pages/AdminSpaceTypesPage";
import AdminSpaceResourcesPage from "@/pages/AdminSpaceResourcesPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.TERMS_AND_CONDITIONS} element={<TermsAndConditionsPage />} />

        <Route element={<AuthGuard />} >
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>

      </Route>

      <Route element={<GuestGuard />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.AUTH.RECOVER_PASSWORD} element={<RecoverPasswordPage />} />
          <Route path={ROUTES.AUTH.RESET_PASSWORD} element={<ResetPasswordPage />} />
        </Route>
      </Route>

      <Route element={<RoleGuard allowedRoles={[RoleConstant.ADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.USERS} element={<AdminUsersPage />} />
          <Route path={ROUTES.ADMIN.SPACE_TYPES} element={<AdminSpaceTypesPage />} />
          <Route path={ROUTES.ADMIN.SPACE_RESOURCES} element={<AdminSpaceResourcesPage />} />

        </Route>
      </Route>

    </Routes>
  );
}
