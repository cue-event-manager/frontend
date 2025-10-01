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
                gap: "2rem",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg,${alpha(theme.palette.secondary.light, 0)} 40%,${alpha(theme.palette.secondary.main, 0.2)} 100%)`
            }}
        >
            <Link to={ROUTES.HOME}>
                <Logo />
            </Link>
            <Container maxWidth="sm">
                <Outlet />
            </Container>
        </Box>
    );
}
