import { useFormContext, useFieldArray } from "react-hook-form";
import {
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    IconButton,
    Paper,
    Stack,
    Divider,
    Fade,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { EventFormData } from "@/shared/validation/eventSchema";

export default function StepAgenda() {
    const { t } = useTranslation();
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<EventFormData>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "agenda",
    });

    const handleAddItem = () => {
        append({
            title: "",
            description: "",
            startTime: "",
            endTime: "",
        });
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    mb: 2.5,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t("events.sections.agenda")}
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddItem}
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                    }}
                >
                    {t("events.actions.addAgendaItem")}
                </Button>
            </Box>

            {fields.length === 0 ? (
                <Paper
                    elevation={1}
                    sx={(theme) => ({
                        borderRadius: 2,
                        border: "1px dashed",
                        borderColor: theme.palette.divider,
                        backgroundColor: alpha(theme.palette.background.paper, 0.3),
                        textAlign: "center",
                        py: 6,
                    })}
                >
                    <EventNoteIcon
                        sx={{
                            fontSize: 56,
                            color: "text.disabled",
                            mb: 1.5,
                        }}
                    />
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 0.5 }}>
                        {t("events.labels.noAgendaItems")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {t("events.labels.addFirstItem")}
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddItem}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                        }}
                    >
                        {t("events.actions.addAgendaItem")}
                    </Button>
                </Paper>
            ) : (
                <Fade in timeout={250}>
                    <Stack spacing={2}>
                        {fields.map((field, index) => (
                            <Paper
                                key={field.id}
                                elevation={1}
                                sx={(theme) => ({
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: alpha(theme.palette.divider, 0.2),
                                    backgroundColor: alpha(theme.palette.background.paper, 0.75),
                                    transition: "all 0.25s ease",
                                    "&:hover": {
                                        borderColor: theme.palette.primary.main,
                                        boxShadow: theme.shadows[2],
                                        transform: "translateY(-1px)",
                                    },
                                })}
                            >
                                <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            mb: 1.5,
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <DragIndicatorIcon
                                                sx={{ color: "text.disabled", fontSize: 20 }}
                                            />
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ fontWeight: 700, color: "text.primary" }}
                                            >
                                                {t("events.labels.activity")} {index + 1}
                                            </Typography>
                                        </Box>

                                        <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => remove(index)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "error.light",
                                                    color: "white",
                                                },
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    <Divider sx={{ mb: 2 }} />

                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label={t("events.fields.activityTitle")}
                                                {...register(`agenda.${index}.title`)}
                                                error={!!errors.agenda?.[index]?.title}
                                                helperText={String(
                                                    errors.agenda?.[index]?.title?.message ?? " "
                                                )}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                minRows={2}
                                                size="small"
                                                label={t("events.fields.activityDescription")}
                                                {...register(`agenda.${index}.description`)}
                                                error={!!errors.agenda?.[index]?.description}
                                                helperText={String(
                                                    errors.agenda?.[index]?.description?.message ?? " "
                                                )}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="time"
                                                label={t("events.fields.startTime")}
                                                InputLabelProps={{ shrink: true }}
                                                {...register(`agenda.${index}.startTime`)}
                                                error={!!errors.agenda?.[index]?.startTime}
                                                helperText={String(
                                                    errors.agenda?.[index]?.startTime?.message ?? " "
                                                )}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="time"
                                                label={t("events.fields.endTime")}
                                                InputLabelProps={{ shrink: true }}
                                                {...register(`agenda.${index}.endTime`)}
                                                error={!!errors.agenda?.[index]?.endTime}
                                                helperText={String(
                                                    errors.agenda?.[index]?.endTime?.message ?? " "
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        ))}
                    </Stack>
                </Fade>
            )}

            {fields.length > 0 && (
                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddItem}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2,
                            px: 4,
                            py: 1,
                        }}
                    >
                        {t("events.actions.addAnotherItem")}
                    </Button>
                </Box>
            )}
        </Box>
    );
}
