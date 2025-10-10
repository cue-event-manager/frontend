import { ROUTES } from "@/routes/routes";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

export const ADMIN_MENU_ITEMS = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Usuarios", icon: <PeopleIcon />, path: ROUTES.ADMIN.USERS },
  { text: "Configuración", icon: <SettingsIcon />, path: "/admin/settings" },
];
