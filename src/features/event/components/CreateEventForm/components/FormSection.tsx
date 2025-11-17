import type { ReactNode } from "react";
import { Alert, type AlertProps, Box, Paper, Stack, Typography } from "@mui/material";

interface FormSectionProps {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
    children: ReactNode;
    spacing?: number;
}

export function FormSection({
    title,
    subtitle,
    actions,
    children,
    spacing = 2,
}: FormSectionProps) {
    return (
        <Paper
            elevation={4}
            sx={{
                p: { xs: 2.5, md: 3 },
                mb: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: (theme) => theme.palette.divider,
                bgcolor: (theme) => theme.palette.background.paper,
            }}
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                sx={{ mb: subtitle ? 1.5 : spacing }}
            >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="body2" color="text.secondary">
                            {subtitle}
                        </Typography>
                    )}
                </Box>
                {actions && <Box>{actions}</Box>}
            </Stack>

            <Box>{children}</Box>
        </Paper>
    );
}

interface FormSectionAlertProps extends AlertProps {
    title?: string;
    description?: ReactNode;
}

export function FormSectionAlert({ title, description, children, sx, ...rest }: FormSectionAlertProps) {
    const baseStyles = {
        borderRadius: 2,
        alignItems: "flex-start",
        py: 1.5,
        px: 2,
    } as const;
    const mergedSx = Array.isArray(sx)
        ? [baseStyles, ...sx]
        : sx
          ? [baseStyles, sx]
          : baseStyles;

    return (
        <Alert variant="outlined" {...rest} sx={mergedSx}>
            <Stack spacing={0.75}>
                {title && (
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {title}
                    </Typography>
                )}
                {description && (
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                )}
                {children}
            </Stack>
        </Alert>
    );
}
