import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#003f70",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#ff6f61",
            contrastText: "#ffffff",
        },
        success: {
            main: "#2e7d32",
            contrastText: "#ffffff",
        },
        error: {
            main: "#d32f2f",
            contrastText: "#ffffff",
        },
        warning: {
            main: "#ed6c02",
            contrastText: "#000000",
        },
        info: {
            main: "#0288d1",
            contrastText: "#ffffff",
        },
        grey: {
            50: "#f9f9f9",
            100: "#f0f0f0",
            200: "#e0e0e0",
            300: "#c2c2c2",
            400: "#9e9e9e",
            500: "#7e7e7e",
            600: "#626262",
            700: "#515151",
            800: "#3b3b3b",
            900: "#222222",
        },
        background: {
            default: "#f5f7fa",
            paper: "#ffffff",
        },
        text: {
            primary: "#1a1a1a",
            secondary: "#4f4f4f",
        },
    },
    typography: {
        fontFamily: "Poppins, Roboto, Arial, sans-serif",
        allVariants: {
            color: "#1a1a1a",
        },
        h1: { fontWeight: 700, fontSize: "3rem", color: "#002d52" },
        h2: { fontWeight: 600, fontSize: "2.25rem", color: "#002d52" },
        h3: { fontWeight: 600, fontSize: "1.75rem", color: "#002d52" },
        h4: { fontWeight: 600, fontSize: "1.5rem", color: "#002d52" },
        h5: { fontWeight: 500, fontSize: "1.25rem", color: "#002d52" },
        h6: { fontWeight: 500, fontSize: "1.125rem", color: "#002d52" },
        body1: { fontSize: "1rem", lineHeight: 1.6 },
        body2: { fontSize: "0.875rem", lineHeight: 1.57 },
        button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 16px",
                },
                containedPrimary: {
                    boxShadow: "none",
                    "&:hover": {
                        backgroundColor: "#002d52",
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

export default theme;
