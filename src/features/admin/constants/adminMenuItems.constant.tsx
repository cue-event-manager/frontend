import { ROUTES } from "@/routes/routes";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CategoryIcon from "@mui/icons-material/Category";
import BuildIcon from "@mui/icons-material/Build";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import SchoolIcon from "@mui/icons-material/School";


export interface AdminMenuItem {
  text: string;
  icon?: React.ReactNode;
  path?: string;
  children?: AdminMenuItem[];
}

export const ADMIN_MENU_ITEMS: AdminMenuItem[] = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
  },
  {
    text: "Usuarios",
    icon: <PeopleIcon />,
    path: ROUTES.ADMIN.USERS,
  },
  {
    text: "Espacios",
    icon: <MeetingRoomIcon />,
    children: [
      {
        text: "Gestión de espacios",
        icon: <MeetingRoomIcon fontSize="small" />,
        path: "/admin/spaces",
      },
      {
        text: "Sedes",
        icon: <SchoolIcon fontSize="small" />,
        path: ROUTES.ADMIN.CAMPUSES,
      },
      {
        text: "Tipos de espacio",
        icon: <CategoryIcon fontSize="small" />,
        path: ROUTES.ADMIN.SPACE_TYPES,
      },
      {
        text: "Recursos de espacio",
        icon: <BuildIcon fontSize="small" />,
        path: ROUTES.ADMIN.SPACE_RESOURCES,
      },
      {
        text: "Estados de espacio",
        icon: <ToggleOnIcon fontSize="small" />,
        path: ROUTES.ADMIN.SPACE_STATUSES,
      }
    ],
  },
];
