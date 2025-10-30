import OrganizerQuickActions from "@/features/organizer/components/OrganizerQuickActions";
import OrganizerWelcomeSection from "@/features/organizer/components/OrganizerWelcomeSection";
import { Box } from "@mui/material";

export default function OrganizerHomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Sección de bienvenida */}
      <OrganizerWelcomeSection />

      {/* Accesos rápidos */}
      <OrganizerQuickActions />

      {/* Espacio para futuras secciones */}
      {/* <OrganizerStatsOverview /> */}
      {/* <OrganizerUpcomingEvents /> */}
    </Box>
  );
}
