import { Box, useTheme } from "@mui/material";

type LogoSize = "default" | "compact";

interface LogoProps {
  size?: LogoSize;
}

const SIZE_MAP: Record<LogoSize, { height: number; width: number; translateY?: string; scale?: number }> = {
  default: { height: 96, width: 110, translateY: "0px", scale: 1 },
  compact: { height: 76, width: 88, translateY: "1px", scale: 0.98 },
};

export default function Logo({ size = "default" }: LogoProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { height, width, translateY, scale } = SIZE_MAP[size];

  return (
    <Box display="flex" alignItems="center">
      <img
        src="/branding/logo.png"
        alt="Logo"
        style={{
          height,
          width,
          transition: "all 0.25s ease",
          transform: `translateY(${translateY}) scale(${scale})`,
          filter: isDark ? "brightness(0) invert(1) contrast(1.08)" : "none",
        }}
      />
    </Box>
  );
}
