import { useFormContext, Controller } from "react-hook-form";
import {
    Box,
    Grid,
    TextField,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Paper,
    Divider,
    Fade,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { SearchSelect } from "@/components/molecules/SearchSelect";
import { useAllFaculties } from "@/features/faculty/hooks/useAllFaculties";
import { useAllAcademicAreas } from "@/features/academicarea/hooks/useAllAcademicAreas";
import { useAllAcademicPrograms } from "@/features/academicprogram/hooks/useAllAcademicPrograms";
import type { EventFormData } from "@/shared/validation/eventSchema";

export default function StepOrganizer() {
    const { t } = useTranslation();
    const {
        control,
        register,
        watch,
        setValue,
        resetField,
        clearErrors,
        formState: { errors },
    } = useFormContext<EventFormData>();

    const organizerType = watch("organizer.type");
    const selectedFacultyId = watch("organizer.internalFacultyId");

    const faculties = useAllFaculties();
    const programs = useAllAcademicPrograms({ facultyId: selectedFacultyId ?? undefined });
    const academicAreas = useAllAcademicAreas();

    useEffect(() => {
        if (organizerType === "INTERNAL") {
            clearErrors([
                "organizer.externalOrganizationName",
                "organizer.externalOrganizationWebsite",
            ]);
            resetField("organizer.externalOrganizationName", { defaultValue: null });
            resetField("organizer.externalOrganizationWebsite", { defaultValue: null });
        } else if (organizerType === "EXTERNAL") {
            clearErrors([
                "organizer.internalFacultyId",
                "organizer.internalProgramId",
                "organizer.internalAcademicAreaId",
            ]);
            resetField("organizer.internalFacultyId", { defaultValue: null });
            resetField("organizer.internalProgramId", { defaultValue: null });
            resetField("organizer.internalAcademicAreaId", { defaultValue: null });
        }
    }, [organizerType, clearErrors, resetField]);

    useEffect(() => {
        if (organizerType === "INTERNAL") {
            setValue("organizer.internalProgramId", null);
        }
    }, [selectedFacultyId, organizerType, setValue]);

    return (
        <Box
            sx={{ mt: 1 }}
        >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                {t("events.sections.organizer")}
            </Typography>

            <Paper
                elevation={1}
                sx={{
                    p: 2.5,
                    mb: 4,
                    borderRadius: 2,
                    backgroundColor: "background.surface",
                    transition: "all 0.3s ease",
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{ mb: 1.5, fontWeight: 600, color: "text.primary" }}
                >
                    {t("events.fields.organizerType")}
                </Typography>

                <Controller
                    name="organizer.type"
                    control={control}
                    render={({ field }) => (
                        <ToggleButtonGroup
                            value={field.value || "INTERNAL"}
                            exclusive
                            onChange={(_, value) => value && field.onChange(value)}
                            sx={{
                                display: "flex",
                                gap: 2,
                                "& .MuiToggleButton-root": {
                                    flex: 1,
                                    py: 2,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    transition: "all 0.25s ease",
                                    color: "text.secondary",
                                    borderColor: "divider",
                                    "&.Mui-selected": {
                                        color: "primary.contrastText",
                                        backgroundColor: "primary.main",
                                        borderColor: "primary.main",
                                    },
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                },
                            }}
                        >
                            <ToggleButton value="INTERNAL">
                                <SchoolIcon sx={{ mr: 1 }} />
                                {t("events.organizerType.internal")}
                            </ToggleButton>
                            <ToggleButton value="EXTERNAL">
                                <BusinessIcon sx={{ mr: 1 }} />
                                {t("events.organizerType.external")}
                            </ToggleButton>
                        </ToggleButtonGroup>
                    )}
                />
            </Paper>

            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                {t("events.sections.contactInfo")}
            </Typography>

            <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        label={t("events.fields.organizerName")}
                        {...register("organizer.name")}
                        error={!!errors.organizer?.name}
                        helperText={String(errors.organizer?.name?.message ?? " ")}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        type="email"
                        label={t("events.fields.organizerEmail")}
                        {...register("organizer.email")}
                        error={!!errors.organizer?.email}
                        helperText={String(errors.organizer?.email?.message ?? " ")}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        label={t("events.fields.organizerPhone")}
                        {...register("organizer.phone")}
                        error={!!errors.organizer?.phone}
                        helperText={String(errors.organizer?.phone?.message ?? " ")}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Fade timeout={{ appear: 200, enter: 200, exit: 0 }}
                in={organizerType === "INTERNAL"} unmountOnExit>
                <Box>
                    <HintBar
                        text={t(
                            "events.hints.internalOrganizer",
                            "Seleccione la facultad, programa y área académica que organiza el evento"
                        )}
                    />

                    <Grid container spacing={2.5} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller
                                name="organizer.internalFacultyId"
                                control={control}
                                render={({ field }) => (
                                    <SearchSelect
                                        name="organizer.internalFacultyId"
                                        label={t("events.fields.faculty")}
                                        control={control}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={
                                            faculties.data?.map((f) => ({
                                                label: f.name,
                                                value: f.id,
                                            })) ?? []
                                        }
                                        loading={faculties.isLoading}
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller
                                name="organizer.internalProgramId"
                                control={control}
                                render={({ field }) => (
                                    <SearchSelect
                                        name="organizer.internalProgramId"
                                        label={t("events.fields.program")}
                                        control={control}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={
                                            programs.data?.map((p) => ({
                                                label: p.name,
                                                value: p.id,
                                            })) ?? []
                                        }
                                        loading={programs.isLoading}
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller
                                name="organizer.internalAcademicAreaId"
                                control={control}
                                render={({ field }) => (
                                    <SearchSelect
                                        name="organizer.internalAcademicAreaId"
                                        label={t("events.fields.academicArea")}
                                        control={control}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={
                                            academicAreas.data?.map((a) => ({
                                                label: a.name,
                                                value: a.id,
                                            })) ?? []
                                        }
                                        loading={academicAreas.isLoading}
                                        required
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Fade>

            <Fade timeout={{ appear: 200, enter: 200, exit: 0 }}
                in={organizerType === "EXTERNAL"} unmountOnExit>
                <Box>
                    <HintBar
                        text={t(
                            "events.hints.externalOrganizer",
                            "Ingrese los datos de la organización externa"
                        )}
                    />
                    <Grid container spacing={2.5} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label={t("events.fields.organizationName")}
                                {...register("organizer.externalOrganizationName")}
                                error={!!errors.organizer?.externalOrganizationName}
                                helperText={String(
                                    errors.organizer?.externalOrganizationName?.message ?? " "
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="url"
                                label={t("events.fields.organizationWebsite")}
                                placeholder="https://example.com"
                                {...register("organizer.externalOrganizationWebsite")}
                                error={!!errors.organizer?.externalOrganizationWebsite}
                                helperText={String(
                                    errors.organizer?.externalOrganizationWebsite?.message ?? " "
                                )}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Box>
    );
}

function HintBar({ text }: { text: string }) {
    return (
        <Box
            sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.info.main, 0.08),
                color: theme.palette.info.main,
                fontWeight: 500,
                fontSize: "0.9rem",
            })}
        >
            <InfoOutlinedIcon fontSize="small" />
            {text}
        </Box>
    );
}
