import { Box, CircularProgress } from "@mui/material";

export default function SplashScreen() {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                bgcolor: "background.default",
            }}
        >
            <CircularProgress size={50} thickness={4} />
        </Box>
    )
}

