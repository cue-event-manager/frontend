import React, { createContext, useContext } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

interface AdminSectionRootProps {
    withPaper?: boolean;
    children: React.ReactNode;
}

interface AdminSectionContextValue {
    withPaper: boolean;
}

const AdminSectionContext = createContext<AdminSectionContextValue | null>(null);

function useAdminSection() {
    const ctx = useContext(AdminSectionContext);
    if (!ctx) throw new Error("AdminSection compound components must be inside <AdminSection.Root>");
    return ctx;
}

function Root({ withPaper = true, children }: AdminSectionRootProps) {
    return (
        <AdminSectionContext.Provider value={{ withPaper }}>
            <Box
                component="section"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                {children}
            </Box>
        </AdminSectionContext.Provider>
    );
}

interface HeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
}

function Header({ title, description, actions }: HeaderProps) {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
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
            </Box>

            {actions && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: { xs: 1, sm: 0 },
                    }}
                >
                    {actions}
                </Box>
            )}
        </Box>
    );
}

interface BodyProps {
    children: React.ReactNode;
}

function Body({ children }: BodyProps) {
    const { withPaper } = useAdminSection();

    if (withPaper) {
        return (
            <>
                <Divider />
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        boxShadow: "none",
                        overflowX: "auto",
                    }}
                >
                    {children}
                </Paper>
            </>
        );
    }

    return (
        <>
            <Divider />
            {children}
        </>
    );
}

export const AdminSection = {
    Root,
    Header,
    Body,
};
