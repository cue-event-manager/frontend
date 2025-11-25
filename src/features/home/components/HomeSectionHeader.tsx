import { Box, Typography, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

interface HomeSectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: "center" | "left";
    maxWidth?: number | string;
    sx?: SxProps<Theme>;
}

export function HomeSectionHeader({
    title,
    subtitle,
    align = "center",
    maxWidth = 720,
    sx,
}: HomeSectionHeaderProps) {
    const theme = useTheme();
    const isLeft = align === "left";

    return (
        <Box
            sx={{
                textAlign: align,
                mb: { xs: 5, md: 6 },
                ...sx,
            }}
        >
            <Box
                sx={{
                    width: 56,
                    height: 4,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: 2,
                    mb: 2,
                    mx: isLeft ? 0 : "auto",
                    boxShadow: `0 2px 10px ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.12)"}`,
                }}
            />
            <Typography
                variant="h3"
                sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
            >
                {title}
            </Typography>
            {subtitle && (
                <Typography
                    variant="body1"
                    sx={{
                        color: "text.secondary",
                        maxWidth,
                        mx: isLeft ? 0 : "auto",
                        mt: 1.5,
                        fontSize: "1.05rem",
                        lineHeight: 1.7,
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
}
