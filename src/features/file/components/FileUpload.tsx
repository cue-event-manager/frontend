import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    IconButton,
    Stack,
    type SxProps,
    type Theme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useUploadImage } from "@/features/file/hooks/useUploadImage";
import type { File as UploadedFile } from "@/domain/file/File";
import { useTranslation } from "react-i18next";

interface FileUploadProps {
    label?: string;
    onUploadSuccess?: (file: UploadedFile) => void;
    accept?: string;
    disabled?: boolean;
    shape?: "circle" | "square";
    size?: number;
    aspectRatio?: number | string;
    sx?: SxProps<Theme>;
}

export function FileUpload({
    label,
    onUploadSuccess,
    accept = "image/*",
    disabled = false,
    shape = "square",
    size = 260,
    aspectRatio = "16 / 9",
    sx,
}: FileUploadProps) {
    const { t } = useTranslation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const uploadMutation = useUploadImage();

    const handleFileSelect = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));

            uploadMutation.mutate(
                { file },
                {
                    onSuccess: (uploaded) => {
                        onUploadSuccess?.(uploaded);
                    },
                }
            );
        },
        [uploadMutation, onUploadSuccess, previewUrl]
    );

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setSelectedFile(null);
        setPreviewUrl(null);
        uploadMutation.reset();
        if (inputRef.current) inputRef.current.value = "";
    };
    const handleClick = () => {
        if (!disabled && inputRef.current) {
            inputRef.current.click();
        }
    };

    useEffect(
        () => () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        },
        [previewUrl],
    );

    const isUploading = uploadMutation.isPending;
    const isUploaded = uploadMutation.isSuccess && !!selectedFile;
    const borderRadiusValue = shape === "circle" ? "50%" : 2;
    const previewMinSize = size;
    const previewAspectRatio = aspectRatio;
    const showInstructions = !previewUrl;

    const statusConfig = useMemo(() => {
        if (isUploading) {
            return {
                message: t("fileUpload.uploading"),
                palette: "info" as const,
                icon: <CircularProgress size={14} color="inherit" />,
            };
        }

        if (uploadMutation.isError) {
            return {
                message: t("fileUpload.error"),
                palette: "error" as const,
                icon: <ErrorOutlineIcon fontSize="small" />,
            };
        }

        if (isUploaded) {
            return {
                message: t("fileUpload.success"),
                palette: "success" as const,
                icon: <CheckCircleIcon fontSize="small" />,
            };
        }

        return null;
    }, [isUploading, isUploaded, uploadMutation.isError, t]);

    const baseStyles: SxProps<Theme> = {
        width: "100%",
        minHeight: previewMinSize,
        border: "2px dashed",
        borderColor: isUploaded ? "success.main" : "grey.400",
        borderRadius: 3,
        pt: 3,
        px: 3,
        pb: statusConfig ? 6 : 3,
        textAlign: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        position: "relative",
        transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
        bgcolor: "background.paper",
        "&:hover": {
            borderColor: disabled ? "grey.400" : "primary.main",
            boxShadow: disabled ? "none" : 4,
        },
    };

    const mergedSx: SxProps<Theme> = Array.isArray(sx)
        ? [baseStyles, ...sx]
        : sx
          ? [baseStyles, sx]
          : baseStyles;

    return (
        <Box sx={mergedSx} onClick={handleClick}>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                style={{ display: "none" }}
                onChange={handleFileSelect}
                disabled={disabled}
            />

            <Stack
                spacing={showInstructions ? 1.5 : 1}
                alignItems="center"
                width="100%"
                sx={{ flexGrow: 1, justifyContent: "center" }}
            >
                <Box
                    sx={{
                        width: "100%",
                        aspectRatio: previewAspectRatio,
                        minHeight: previewMinSize,
                        borderRadius: borderRadiusValue,
                        border: previewUrl ? "none" : "1px dashed",
                        borderColor: previewUrl ? "transparent" : "grey.300",
                        bgcolor: previewUrl ? "grey.100" : "grey.50",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {previewUrl ? (
                        <>
                            <Box
                                component="img"
                                src={previewUrl}
                                alt={t("fileUpload.previewAlt")}
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            <IconButton
                                size="small"
                                onClick={handleRemoveFile}
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    bgcolor: "background.paper",
                                    boxShadow: 1,
                                }}
                                aria-label={t("fileUpload.remove") ?? "remove"}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </>
                    ) : (
                        <CloudUploadIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    )}
                </Box>

                {showInstructions && (
                    <>
                        <Typography variant="body1" color="text.primary" fontWeight={600}>
                            {label ?? t("fileUpload.label")}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {t("fileUpload.hint")}
                        </Typography>
                    </>
                )}
            </Stack>

            {statusConfig && (
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                        position: "absolute",
                        bottom: 12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 999,
                        bgcolor: (theme) =>
                            alpha(theme.palette[statusConfig.palette].main, 0.15),
                        color: (theme) => theme.palette[statusConfig.palette].dark,
                        boxShadow: 2,
                    }}
                >
                    {statusConfig.icon}
                    <Typography variant="caption" fontWeight={600}>
                        {statusConfig.message}
                    </Typography>
                </Stack>
            )}
        </Box>
    );
}
