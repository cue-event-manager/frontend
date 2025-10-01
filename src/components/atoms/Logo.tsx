import { Box } from "@mui/material";

export default function Logo() {
    return (
        <Box display="flex" alignItems="center">
            <img src="/branding/logo.png" alt="Logo" style={{ height: 100, width:120 }} />
        </Box>
    );
}
