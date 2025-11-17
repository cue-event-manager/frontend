import { useFormContext, useFieldArray } from "react-hook-form";
import {
    Box,
    Typography,
    Stack,
    Grid,
    TextField,
    Button,
    Paper,
    IconButton,
    Tooltip,
    Fade,
    LinearProgress,
    Divider,
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
import { FormSection } from "../components/FormSection";

export default function StepAttachments() {
    const { t } = useTranslation();
    const {
        control,
        setValue,
        register,
        watch,
        formState: { errors },
    } = useFormContext<EventFormData>();

    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [uploadedIndexes, setUploadedIndexes] = useState<Set<number>>(new Set());
    const uploadFileMutation = useUploadFile();

    const {
        fields: attachments,
        append: appendAttachment,
        remove: removeAttachment,
    } = useFieldArray({ control, name: "attachments" });

    const {
        fields: contacts,
        append: appendContact,
        remove: removeContact,
    } = useFieldArray({ control, name: "extraContacts" });

    const attachmentsValues = watch("attachments") ?? [];

    const handleDropFiles = async (files: File[]) => {
        if (!files.length) return;
        const startIndex = attachments.length;
        for (const [offset, file] of files.entries()) {
            const newIndex = startIndex + offset;
            appendAttachment({ name: file.name, filePath: "", contentType: file.type });
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

    const handleRename = (index: number, newName: string) => {
        const current = attachmentsValues[index]?.name;
        const normalized = newName.trim();
        if (!normalized || normalized === current) return;
        setValue(`attachments.${index}.name`, normalized, {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const handleAddContact = () => appendContact({ name: "", email: "", phone: "" });

    return (
        <Box sx={{ mt: 1 }}>
            <FormSection
                title={t("events.sections.attachments")}
                subtitle={t("events.labels.dropzoneHint")}
            >
                <DropzoneArea
                    onFilesDrop={handleDropFiles}
                    label={t("events.labels.dropzoneLabel")}
                    hint={t("events.labels.dropzoneHint")}
                    actionLabel={t("events.actions.addAttachment")}
                />

                {attachments.length > 0 && (
                    <Stack spacing={2.5} sx={{ mt: 3 }}>
                        {attachments.map((field, index) => {
                            const attachmentValue = attachmentsValues[index] ?? field;
                            return (
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
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                            {t("events.labels.attachment")} {index + 1}
                                        </Typography>
                                        <Divider sx={{ mb: 2 }} />
                                        <FileCard
                                            name={attachmentValue?.name ?? field.name}
                                            contentType={attachmentValue?.contentType ?? field.contentType}
                                            uploading={uploadingIndex === index}
                                            uploaded={uploadedIndexes.has(index)}
                                            onRename={(newName) => handleRename(index, newName)}
                                            onDelete={() => removeAttachment(index)}
                                        />
                                        {uploadingIndex === index && (
                                            <LinearProgress sx={{ mt: 2 }} color="primary" />
                                        )}
                                    </Box>
                                </Paper>
                            );
                        })}
                    </Stack>
                )}
            </FormSection>

            <FormSection
                title={t("events.sections.extraContacts")}
                subtitle={t("events.hints.extraContacts", "Agrega personas de contacto adicionales")}
                actions={
                    <Button
                        variant="contained"
                        startIcon={<ContactMailIcon />}
                        onClick={handleAddContact}
                        sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2, px: 3, py: 1 }}
                    >
                        {t("events.actions.addContact")}
                    </Button>
                }
            >
                {contacts.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 1 }}>
                        {t("events.labels.noContacts")}
                    </Typography>
                ) : (
                    <Fade in timeout={200}>
                        <Stack spacing={2.5}>
                            {contacts.map((field, index) => (
                                <Paper
                                    key={field.id}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 2,
                                        p: { xs: 2, sm: 2.5 },
                                        borderColor: "divider",
                                        backgroundColor: "background.paper",
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label={t("events.fields.contactName")}
                                                {...register(`extraContacts.${index}.name`)}
                                                error={!!errors.extraContacts?.[index]?.name}
                                                helperText={String(
                                                    errors.extraContacts?.[index]?.name?.message ?? " "
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                type="email"
                                                label={t("events.fields.contactEmail")}
                                                {...register(`extraContacts.${index}.email`)}
                                                error={!!errors.extraContacts?.[index]?.email}
                                                helperText={String(
                                                    errors.extraContacts?.[index]?.email?.message ?? " "
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label={t("events.fields.contactPhone")}
                                                {...register(`extraContacts.${index}.phone`)}
                                                error={!!errors.extraContacts?.[index]?.phone}
                                                helperText={String(
                                                    errors.extraContacts?.[index]?.phone?.message ?? " "
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 2 }} />
                                    <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                        <Tooltip title={t("common.actions.delete") ?? ""}>
                                            <IconButton color="error" onClick={() => removeContact(index)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                    </Fade>
                )}
            </FormSection>
        </Box>
    );
}
