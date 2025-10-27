import { Box, useTheme } from "@mui/material";

export default function Logo() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box display="flex" alignItems="center">
      <img
        src="/branding/logo.png"
        alt="Logo"
        style={{
          height: 100,
          width: 110,
          transition: "filter 0.3s ease",
          filter: isDark
            ? "brightness(0) invert(1) contrast(1.1)"
            : "none", 
        }}
      />
    </Box>
  );
}
