import OrganizerQuickActions from "@/features/organizer/components/OrganizerQuickActions";
import OrganizerWelcomeSection from "@/features/organizer/components/OrganizerWelcomeSection";
import OrganizerWeeklyCalendar from "@/features/organizer/components/OrganizerWeeklyCalendar";
import { Box } from "@mui/material";

export default function OrganizerHomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, sm: 3.5, md: 4 },
        width: "100%",
      }}
    >
      <OrganizerWelcomeSection />

      <OrganizerQuickActions />

      <OrganizerWeeklyCalendar />

    </Box>
  );
}
