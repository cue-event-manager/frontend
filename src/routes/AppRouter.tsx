import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { ROUTES } from "./routes";
import MainLayout from "../components/layouts/MainLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        <Route path={ROUTES.HOME} element={<HomePage />} />

      </Route>
    </Routes>
  );
}
