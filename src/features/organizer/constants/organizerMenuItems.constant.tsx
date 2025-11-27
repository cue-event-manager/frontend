import type { AdminMenuItem } from "@/features/admin/constants/adminMenuItems.constant";
import { ROUTES } from "@/routes/routes";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from '@mui/icons-material/Event';
import AssessmentIcon from '@mui/icons-material/Assessment';


export const ORGANIZER_MENU_ITEMS: AdminMenuItem[] = [
  {
    text: "Inicio",
    icon: <DashboardIcon />,
    path: ROUTES.ORGANIZER.BASE,
  },
  {
    text: "Eventos",
    icon: <EventIcon />,
    children: [
      {
        text: "Mis Eventos",
        icon: <EventIcon fontSize="small" />,
        path: ROUTES.ORGANIZER.EVENTS,
      },
    ],
  },
  {
    text: "Reportes",
    icon: <AssessmentIcon />,
    path: ROUTES.ORGANIZER.REPORTS,
  },

];
