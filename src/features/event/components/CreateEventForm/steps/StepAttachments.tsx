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
} from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import type { EventFormData } from "@/shared/validation/eventSchema";
import { uploadImage } from "@/services/file.service";
import DropzoneArea from "@/components/molecules/DropzoneArea";
import FileCard from "@/components/molecules/FileCard";

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

    const handleFileChange = async (file: File, index: number) => {
        try {
            setUploadingIndex(index);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const uploaded = await uploadImage({ file });
            setValue(`attachments.${index}.name`, uploaded.originalName);
            setValue(`attachments.${index}.filePath`, uploaded.path);
            setValue(`attachments.${index}.contentType`, uploaded.contentType.toString());
            setUploadedIndexes((prev) => new Set(prev).add(index));
        } finally {
            setUploadingIndex(null);
        }
    };

    const handleDropFiles = (files: File[]) => {
        files.forEach((file) =>
            appendAttachment({
                name: file.name,
                filePath: "",
                contentType: file.type,
            })
        );
    };

    const handleAddContact = () =>
        appendContact({ name: "", email: "", phone: "" });

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
                        <FileCard
                            key={field.id}
                            name={field.name}
                            contentType={field.contentType}
                            uploading={uploadingIndex === index}
                            uploaded={uploadedIndexes.has(index)}
                            onDelete={() => removeAttachment(index)}
                            onRename={(newName: string) =>
                                updateAttachment(index, { ...field, name: newName })
                            }
                        />
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
                                    transition: "all 0.25s ease",
                                })}
                            >
                                <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 1.5,
                                        }}
                                    >
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
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: "error.light",
                                                        color: "white",
                                                    },
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>

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

                                        <Grid size={{ xs: 12, sm: 4 }} >
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

                                        <Grid size={{ xs: 12, sm: 4 }} >
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
