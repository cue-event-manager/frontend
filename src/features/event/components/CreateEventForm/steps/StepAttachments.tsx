import { useFormContext, useFieldArray } from "react-hook-form";
import {
    Box,
    Typography,
    Stack,
    Divider,
    Grid,
    TextField,
    Button,
    Paper,
    IconButton,
    Tooltip,
    Fade,
    LinearProgress,
} from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import type { EventFormData } from "@/shared/validation/eventSchema";
import DropzoneArea from "@/components/molecules/DropzoneArea";
import FileCard from "@/components/molecules/FileCard";
import { useUploadFile } from "@/features/file/hooks/useUploadFile";

export default function StepAttachments() {
    const { t } = useTranslation();
    const {
        control,
        setValue,
        register,
        formState: { errors },
    } = useFormContext<EventFormData>();

    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [uploadedIndexes, setUploadedIndexes] = useState<Set<number>>(new Set());
    const uploadFileMutation = useUploadFile();

    const {
        fields: attachments,
        append: appendAttachment,
        remove: removeAttachment,
        update: updateAttachment,
    } = useFieldArray({
        control,
        name: "attachments",
    });

    const {
        fields: contacts,
        append: appendContact,
        remove: removeContact,
    } = useFieldArray({
        control,
        name: "extraContacts",
    });

    const handleDropFiles = async (files: File[]) => {
        for (const file of files) {
            const newIndex = attachments.length;
            appendAttachment({
                name: file.name,
                filePath: "",
                contentType: file.type,
            });
            await handleFileUpload(file, newIndex);
        }
    };

    const handleFileUpload = async (file: File, index: number) => {
        try {
            setUploadingIndex(index);
            const uploaded = await uploadFileMutation.mutateAsync({ file });
            setValue(`attachments.${index}.name`, uploaded.originalName);
            setValue(`attachments.${index}.filePath`, uploaded.path);
            setValue(`attachments.${index}.contentType`, uploaded.contentType.toString());
            setUploadedIndexes((prev) => new Set(prev).add(index));
        } catch (err) {
            console.error("Error al subir archivo:", err);
        } finally {
            setUploadingIndex(null);
        }
    };

    const handleAddContact = () => appendContact({ name: "", email: "", phone: "" });

    return (
        <Box sx={{ mt: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {t("events.sections.attachments")}
            </Typography>

            <DropzoneArea
                onFilesDrop={handleDropFiles}
                label={t("events.labels.dropzoneLabel")}
                hint={t("events.labels.dropzoneHint")}
            />

            {attachments.length > 0 && (
                <Stack spacing={2.5} sx={{ mt: 3 }}>
                    {attachments.map((field, index) => (
                        <Paper
                            key={field.id}
                            elevation={1}
                            sx={(theme) => ({
                                borderRadius: 2.5,
                                border: "1px solid",
                                borderColor: alpha(theme.palette.divider, 0.2),
                                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                                transition: "all 0.25s ease",
                            })}
                        >
                            <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 700, color: "text.primary" }}
                                    >
                                        {t("events.labels.attachment")} {index + 1}
                                    </Typography>

                                </Stack>

                                <Divider sx={{ mb: 2 }} />

                                <FileCard
                                    name={field.name}
                                    contentType={field.contentType}
                                    uploading={uploadingIndex === index}
                                    uploaded={uploadedIndexes.has(index)}
                                    onRename={(newName) =>
                                        updateAttachment(index, { ...field, name: newName })
                                    }
                                    onDelete={() => removeAttachment(index)}
                                />

                                {uploadingIndex === index && (
                                    <LinearProgress sx={{ mt: 2 }} color="primary" />
                                )}
                            </Box>
                        </Paper>
                    ))}
                </Stack>
            )}

            <Divider sx={{ my: 4 }} />

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
                    {t("events.sections.extraContacts")}
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<ContactMailIcon />}
                    onClick={handleAddContact}
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                    }}
                >
                    {t("events.actions.addContact")}
                </Button>
            </Box>

            {contacts.length === 0 ? (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center", mt: 2 }}
                >
                    {t("events.labels.noContacts")}
                </Typography>
            ) : (
                <Fade in timeout={250}>
                    <Stack spacing={2}>
                        {contacts.map((field, index) => (
                            <Paper
                                key={field.id}
                                elevation={1}
                                sx={(theme) => ({
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: alpha(theme.palette.divider, 0.2),
                                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                                })}
                            >
                                <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                                    <Stack direction="row" justifyContent="space-between" mb={1.5}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ fontWeight: 700, color: "text.primary" }}
                                        >
                                            {t("events.labels.contact")} {index + 1}
                                        </Typography>
                                        <Tooltip title={t("common.actions.delete") ?? ""}>
                                            <IconButton
                                                color="error"
                                                size="small"
                                                onClick={() => removeContact(index)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>

                                    <Divider sx={{ mb: 2 }} />

                                    <Grid container spacing={2.5}>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label={t("events.fields.contactName")}
                                                {...register(`extraContacts.${index}.name`)}
                                                error={!!errors.extraContacts?.[index]?.name}
                                                helperText={String(
                                                    errors.extraContacts?.[index]?.name?.message ?? " "
                                                )}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="email"
                                                label={t("events.fields.contactEmail")}
                                                {...register(`extraContacts.${index}.email`)}
                                                error={!!errors.extraContacts?.[index]?.email}
                                                helperText={String(
                                                    errors.extraContacts?.[index]?.email?.message ?? " "
                                                )}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label={t("events.fields.contactPhone")}
                                                {...register(`extraContacts.${index}.phone`)}
                                                error={!!errors.extraContacts?.[index]?.phone}
                                                helperText={String(
                                                    errors.extraContacts?.[index]?.phone?.message ?? " "
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
        </Box>
    );
}
