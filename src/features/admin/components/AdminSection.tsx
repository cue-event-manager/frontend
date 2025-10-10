import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

interface AdminSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    withPaper?: boolean;
}


export function AdminSection({
    title,
    description,
    children,
    withPaper = true,
}: AdminSectionProps) {
    const { t } = useTranslation();

    return (
        <Box
            component="section"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
            }}
        >
            <Box>
                <Typography variant="h5" fontWeight={600}>
                    {t(title)}
                </Typography>
                {description && (
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        {t(description)}
                    </Typography>
                )}
                <Divider sx={{ mt: 2 }} />
            </Box>

            {withPaper ? (
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: "none" }}>
                    {children}
                </Paper>
            ) : (
                children
            )}
        </Box>
    );
}
