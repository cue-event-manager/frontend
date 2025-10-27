import { createContext, useMemo, useState, useContext, type ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import lightTheme from "@/themes/lightTheme";
import { darkTheme } from "@/themes/darkTheme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
    mode: ThemeMode;
    toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeContextType>({
    mode: "light",
    toggleMode: () => { },
});

export function useThemeMode() {
    return useContext(ThemeModeContext);
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>(
        (localStorage.getItem("theme") as ThemeMode) || "light"
    );

    const toggleMode = () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("theme", newMode);
    };

    const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
}
