import { ROUTES } from "@/routes/routes";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CategoryIcon from "@mui/icons-material/Category";
import BuildIcon from "@mui/icons-material/Build";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BusinessIcon from '@mui/icons-material/Business';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventIcon from '@mui/icons-material/Event';
import StyleIcon from '@mui/icons-material/Style';
import LabelIcon from '@mui/icons-material/Label';

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
        path: ROUTES.ADMIN.SPACES,
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

  {
    text: "Academia",
    icon: <SchoolIcon />,
    children: [
      {
        text: "Áreas Académicas",
        icon: <AssignmentIndIcon fontSize="small" />,
        path: ROUTES.ADMIN.ACADEMIC_AREAS,
      },
      {
        text: "Facultades",
        icon: <BusinessIcon fontSize="small" />,
        path: ROUTES.ADMIN.FACULTIES,
      },
      {
        text: "Programas Académicos",
        icon: <MenuBookIcon fontSize="small" />,
        path: ROUTES.ADMIN.ACADEMIC_PROGRAMS,
      },
    ],
  },

  {
    text: "Eventos",
    icon: <EventIcon />,
    children: [
      {
        text: "Modalidades de Evento",
        icon: <StyleIcon fontSize="small" />,
        path: ROUTES.ADMIN.EVENT_MODALITIES,
      },
      {
        text: "Categorías de Evento",
        icon: <LabelIcon fontSize="small" />,
        path: ROUTES.ADMIN.EVENT_CATEGORIES,
      },
    ],
  },

];
