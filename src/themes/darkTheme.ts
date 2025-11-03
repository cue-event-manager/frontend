import { createTheme, alpha } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3a8dff",
            light: "#64b5ff",
            dark: "#1a6fe0",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#ff7043",
            light: "#ffa270",
            dark: "#e64a19",
            contrastText: "#ffffff",
        },
        success: { main: "#4caf50", contrastText: "#ffffff" },
        error: { main: "#ef5350", contrastText: "#ffffff" },
        warning: { main: "#ffa726", contrastText: "#000000" },
        info: { main: "#29b6f6", contrastText: "#000000" },

        background: {
            default: "#0d1117",  
            paper: "#11161c",    
        },
        text: {
            primary: "#e6edf3",
            secondary: "#9da5b4",
            disabled: "#6b7280",
        },
        divider: alpha("#ffffff", 0.1),
        action: {
            hover: alpha("#ffffff", 0.05),
            selected: alpha("#ffffff", 0.08),
            disabled: alpha("#ffffff", 0.12),
            focus: alpha("#ffffff", 0.12),
        },
        grey: {
            50: "#222222",
            100: "#3b3b3b",
            200: "#515151",
            300: "#626262",
            400: "#7e7e7e",
            500: "#9e9e9e",
            600: "#c2c2c2",
            700: "#e0e0e0",
            800: "#f0f0f0",
            900: "#f9f9f9",
        },
    },

    typography: {
        fontFamily: "Poppins, Roboto, Arial, sans-serif",
        allVariants: { color: "#e6edf3" },

        h1: { fontWeight: 700, fontSize: "3rem", color: "#ffffff" },
        h2: { fontWeight: 600, fontSize: "2.25rem", color: "#f0f6fc" },
        h3: { fontWeight: 600, fontSize: "1.75rem", color: "#f0f6fc" },
        h4: { fontWeight: 600, fontSize: "1.5rem", color: "#f0f6fc" },
        h5: { fontWeight: 500, fontSize: "1.25rem", color: "#e6edf3" },
        h6: { fontWeight: 500, fontSize: "1.125rem", color: "#e6edf3" },
        body1: { fontSize: "1rem", lineHeight: 1.6 },
        body2: { fontSize: "0.875rem", lineHeight: 1.57 },
        button: { textTransform: "none", fontWeight: 600 },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#0c1117",
                    color: "#e6edf3",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha("#161b22", 0.8),
                    backdropFilter: "blur(10px)",
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 16px",
                    transition: "all 0.2s ease",
                },
                containedPrimary: {
                    backgroundColor: "#3a8dff",
                    "&:hover": {
                        backgroundColor: "#1a6fe0",
                        boxShadow: `0 0 10px ${alpha("#3a8dff", 0.5)}`,
                    },
                },
                containedSecondary: {
                    "&:hover": {
                        backgroundColor: "#e64a19",
                        boxShadow: `0 0 10px ${alpha("#ff7043", 0.5)}`,
                    },
                },
            },
        },

        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        height: 42,
                        paddingRight: "30px !important",
                    },
                    "& .MuiInputBase-input": {
                        padding: "8px 14px !important",
                    },
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                size: "small",
                variant: "outlined",
            },
        },
    },
});
