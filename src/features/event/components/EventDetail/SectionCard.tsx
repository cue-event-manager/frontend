import { Paper } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export function SectionCard({
    children,
    sx,
}: {
    children: ReactNode;
    sx?: SxProps<Theme>;
}) {
    const theme = useTheme();
    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: alpha(theme.palette.divider, theme.palette.mode === "dark" ? 0.1 : 0.1),
                backgroundColor:
                    theme.palette.mode === "dark"
                        ? alpha(theme.palette.background.paper, 0.9)
                        : alpha(theme.palette.common.white, 0.9),
                backdropFilter: "blur(6px)",
                ...sx,
            }}
        >
            {children}
        </Paper>
    );
}
