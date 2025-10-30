import type { AdminMenuItem } from "@/features/admin/constants/adminMenuItems.constant";
import { ROUTES } from "@/routes/routes";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from '@mui/icons-material/Event';


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


    ],
  },

];
