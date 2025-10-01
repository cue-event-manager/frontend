import { Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoginForm from "../features/auth/components/LoginForm";

export default function LoginPage() {
    const { t } = useTranslation();


    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 3,
            }}
        >
            <Typography
                variant="h4"
                align="center"
                sx={{ mb: 3, fontWeight: 700 }}
            >
                {t("auth.login.title")}
            </Typography>
            <LoginForm />
        </Paper>
    );
}
