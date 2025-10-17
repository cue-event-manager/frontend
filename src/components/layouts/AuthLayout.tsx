import { Box, Container } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Logo from "../atoms/Logo";
import { ROUTES } from "../../routes/routes";

export default function AuthLayout() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                gap: "3rem",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.05)} 0%, ${alpha(theme.palette.secondary.light, 0.08)} 50%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-50%",
                    right: "-20%",
                    width: "80%",
                    height: "80%",
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
                    borderRadius: "50%",
                    filter: "blur(60px)",
                    animation: "float 20s ease-in-out infinite",
                },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-30%",
                    left: "-15%",
                    width: "60%",
                    height: "60%",
                    background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.12)} 0%, transparent 70%)`,
                    borderRadius: "50%",
                    filter: "blur(50px)",
                    animation: "float 15s ease-in-out infinite reverse",
                },
                "@keyframes float": {
                    "0%, 100%": {
                        transform: "translate(0, 0) scale(1)",
                    },
                    "33%": {
                        transform: "translate(30px, -30px) scale(1.05)",
                    },
                    "66%": {
                        transform: "translate(-20px, 20px) scale(0.95)",
                    },
                },
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(${alpha(theme.palette.divider, 0.03)} 1px, transparent 1px),
                                      linear-gradient(90deg, ${alpha(theme.palette.divider, 0.03)} 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                    maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)",
                }}
            />

            <Link
                to={ROUTES.HOME}
                style={{
                    position: "relative",
                    zIndex: 1,
                    transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
                <Logo />
            </Link>

            <Container
                maxWidth="sm"
                sx={{
                    position: "relative",
                    zIndex: 1,
                }}
            >

                <Outlet />
            </Container>

            <Box
                sx={{
                    position: "absolute",
                    top: "10%",
                    left: "10%",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: theme.palette.primary.main,
                    opacity: 0.4,
                    animation: "twinkle 3s ease-in-out infinite",
                    "@keyframes twinkle": {
                        "0%, 100%": { opacity: 0.4, transform: "scale(1)" },
                        "50%": { opacity: 1, transform: "scale(1.5)" },
                    },
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: "70%",
                    right: "15%",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: theme.palette.secondary.main,
                    opacity: 0.3,
                    animation: "twinkle 4s ease-in-out infinite 1s",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "20%",
                    left: "20%",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: theme.palette.primary.light,
                    opacity: 0.5,
                    animation: "twinkle 3.5s ease-in-out infinite 0.5s",
                }}
            />
        </Box>
    );
}