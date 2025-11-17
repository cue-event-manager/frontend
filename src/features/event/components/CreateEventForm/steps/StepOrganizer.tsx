import { useFormContext, Controller } from "react-hook-form";
import { Box, Grid, TextField, ToggleButton, ToggleButtonGroup, Fade } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { SearchSelect } from "@/components/molecules/SearchSelect";
import { useAllFaculties } from "@/features/faculty/hooks/useAllFaculties";
import { useAllAcademicAreas } from "@/features/academicarea/hooks/useAllAcademicAreas";
import { useAllAcademicPrograms } from "@/features/academicprogram/hooks/useAllAcademicPrograms";
import type { EventFormData } from "@/shared/validation/eventSchema";
import { FormSection, FormSectionAlert } from "../components/FormSection";

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
        <Box sx={{ mt: 1 }}>
            <FormSection
                title={t("events.sections.organizer")}
                subtitle={t("events.fields.organizerType")}
            >
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
            </FormSection>

            <FormSection
                title={t("events.sections.contactInfo")}
                subtitle={t("events.hints.contactDetails", "Estos datos se compartirán con los asistentes")}
            >
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
            </FormSection>

            <Fade timeout={{ appear: 200, enter: 200, exit: 0 }} in={organizerType === "INTERNAL"} unmountOnExit>
                <Box>
                    <FormSection title={t("events.sections.internalInfo")}>
                        <FormSectionAlert
                            severity="info"
                            description={t(
                                "events.hints.internalOrganizer",
                                "Seleccione la facultad, programa y área académica que organiza el evento"
                            )}
                            sx={{ mb: 2 }}
                        />
                        <Grid container spacing={2.5}>
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
                                            margin="none"
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
                                            margin="none"
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
                                            margin="none"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </FormSection>
                </Box>
            </Fade>

            <Fade timeout={{ appear: 200, enter: 200, exit: 0 }} in={organizerType === "EXTERNAL"} unmountOnExit>
                <Box>
                    <FormSection title={t("events.sections.externalInfo")}>
                        <FormSectionAlert
                            severity="info"
                            description={t(
                                "events.hints.externalOrganizer",
                                "Ingrese los datos de la organización externa"
                            )}
                            sx={{ mb: 2 }}
                        />
                        <Grid container spacing={2.5}>
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
                    </FormSection>
                </Box>
            </Fade>
        </Box>
    );
}
