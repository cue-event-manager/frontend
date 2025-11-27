import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useAllEventCategories } from "@/features/eventcategory/hooks/useAllEventCategories";
import { useAllEventModalities } from "@/features/eventmodality/hooks/useAllEventModalities";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";
import {
    Typography,
    Button,
    Stack,
    TextField,
    MenuItem,
    Paper,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export function HeroEventsFilterCTA() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const modalities = useAllEventModalities();
    const theme = useTheme();
    const [form, setForm] = useState({
        modalityId: "",
        fromDate: "",
        toDate: "",
    });

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (form.modalityId) params.set("modalityId", form.modalityId);
        if (form.fromDate) params.set("fromDate", form.fromDate);
        if (form.toDate) params.set("toDate", form.toDate);

        const queryString = params.toString();
        navigate(queryString ? `${ROUTES.EVENTS}?${queryString}` : ROUTES.EVENTS);
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
                p: { xs: 2, sm: 2.25, md: 2.5 },
                borderRadius: 5,
                zIndex: 1000,
                border: "1px solid",
                borderColor: (theme) =>
                    theme.palette.mode === "light"
                        ? alpha(theme.palette.primary.main, 0.2)
                        : alpha(theme.palette.primary.light, 0.25),
                background: (theme) =>
                    `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(
                        theme.palette.secondary.main,
                        0.06
                    )}), ${theme.palette.background.paper}`,
                boxShadow: (theme) =>
                    theme.palette.mode === "light"
                        ? "0 20px 60px rgba(15, 23, 42, 0.16)"
                        : "0 18px 38px rgba(0,0,0,0.45)",
                backdropFilter: "blur(8px)",
            }}
        >
            <Stack spacing={1.5}>
                <Typography variant="h6" fontWeight={900}>
                    {t("hero.cta", "Encuentra eventos")}
                </Typography>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={1.2}
                    useFlexGap
                    alignItems={{ xs: "stretch", md: "center" }}
                    flexWrap={{ xs: "wrap", md: "nowrap" }}
                >
                    <TextField
                        type="date"
                        label={t("publicEvents.filters.fromDate", "Desde")}
                        value={form.fromDate}
                        onChange={(e) => handleChange("fromDate", e.target.value)}
                        size="small"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: { md: 170 } }}
                    />
                    <TextField
                        type="date"
                        label={t("publicEvents.filters.toDate", "Hasta")}
                        value={form.toDate}
                        onChange={(e) => handleChange("toDate", e.target.value)}
                        size="small"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: { md: 170 } }}
                    />

                    <TextField
                        select
                        label={t("publicEvents.filters.modality")}
                        value={form.modalityId}
                        onChange={(e) => handleChange("modalityId", e.target.value)}
                        fullWidth
                        size="small"
                        sx={{ minWidth: { md: 180 } }}
                    >
                        <MenuItem value="">{t("common.all")}</MenuItem>
                        {(modalities.data ?? []).map((m) => (
                            <MenuItem key={m.id} value={m.id}>
                                {m.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            whiteSpace: "nowrap",
                            minWidth: { xs: "100%", md: 140 },
                            mt: { xs: 0.5, md: 0 },
                        }}
                    >
                        {t("common.search", "Buscar")}
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}
