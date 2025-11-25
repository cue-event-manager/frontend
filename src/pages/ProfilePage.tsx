import UpdateProfileForm from "@/features/auth/profile/components/UpdateProfileForm";
import useNavbarHeight from "@/shared/hooks/useNavbarHeight";
import { useAuth } from "@/contexts/authContext";
import { Box, Chip, Container, Stack, Typography, alpha, useTheme } from "@mui/material";

export default function ProfilePage() {
    const navbarHeight = useNavbarHeight();
    const { user } = useAuth();
    const theme = useTheme();

    return (
        <Box
            component="section"
            sx={{
                minHeight: `calc(100vh - ${navbarHeight}px)`,
                py: { xs: 6, md: 8 },
                background: `radial-gradient(circle at 20% 20%, ${alpha(theme.palette.primary.main, 0.08)}, transparent 25%),
                             radial-gradient(circle at 80% 10%, ${alpha(theme.palette.secondary.main, 0.08)}, transparent 25%),
                             linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={4}>
                    <Box
                        sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: 3,
                            background: alpha(theme.palette.background.paper, 0.8),
                            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                            boxShadow: `0 14px 40px ${alpha(theme.palette.common.black, 0.08)}`,
                            backdropFilter: "blur(12px)",
                        }}
                    >
                        <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" spacing={2} justifyContent="space-between">
                            <Stack spacing={0.5} alignItems={{ xs: "center", sm: "flex-start" }}>
                                <Typography variant="h4" fontWeight={800} textAlign={{ xs: "center", sm: "left" }}>
                                    {user ? `${user.firstName} ${user.lastName}` : "Perfil"}
                                </Typography>
                                <Typography variant="overline" color="primary" fontWeight={500} letterSpacing={1}>
                                    {user?.email}
                                </Typography>

                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Chip
                                    label="Perfil personal"
                                    color="primary"
                                    sx={{ fontWeight: 700, borderRadius: 2 }}
                                />
                            </Stack>
                        </Stack>
                    </Box>

                    <UpdateProfileForm />
                </Stack>
            </Container>
        </Box>
    );
}
