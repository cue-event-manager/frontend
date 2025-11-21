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
      <OrganizerWelcomeSection />

      <OrganizerQuickActions />

    </Box>
  );
}
