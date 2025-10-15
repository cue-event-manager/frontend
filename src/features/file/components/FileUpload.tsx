import React, { useCallback, useRef, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
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
}

export function FileUpload({
    label,
    onUploadSuccess,
    accept = "image/*",
    disabled = false,
    shape = "square",
    size = 120,
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
        [uploadMutation, onUploadSuccess]
    );

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleClick = () => {
        if (!disabled && inputRef.current) {
            inputRef.current.click();
        }
    };

    const isUploading = uploadMutation.isPending;
    const isUploaded = uploadMutation.isSuccess && !!selectedFile;

    return (
        <Box
            sx={{
                border: "2px dashed",
                borderColor: isUploaded ? "success.main" : "grey.400",
                borderRadius: shape === "circle" ? "50%" : 2,
                p: 3,
                textAlign: "center",
                cursor: disabled ? "not-allowed" : "pointer",
                position: "relative",
                transition: "border-color 0.2s ease-in-out",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                    borderColor: disabled ? "grey.400" : "primary.main",
                },
            }}
            onClick={handleClick}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                style={{ display: "none" }}
                onChange={handleFileSelect}
                disabled={disabled}
            />

            {previewUrl ? (
                <Box sx={{ position: "relative", display: "inline-block" }}>
                    <img
                        src={previewUrl}
                        alt={t("fileUpload.previewAlt")}
                        style={{
                            width: size,
                            height: size,
                            objectFit: "cover",
                            borderRadius: shape === "circle" ? "50%" : 8,
                        }}
                    />
                    <IconButton
                        size="small"
                        onClick={handleRemoveFile}
                        sx={{
                            position: "absolute",
                            top: -10,
                            right: -10,
                            bgcolor: "background.paper",
                            boxShadow: 1,
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            ) : (
                <Box>
                    <CloudUploadIcon
                        sx={{ fontSize: 48, color: "text.secondary", mb: 1 }}
                    />
                    <Typography variant="body1" color="text.secondary">
                        {label ?? t("fileUpload.label")}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                        {t("fileUpload.hint")}
                    </Typography>
                </Box>
            )}

            {isUploading && (
                <Box sx={{ mt: 2 }}>
                    <CircularProgress size={24} />
                    <Typography variant="caption" sx={{ ml: 1 }}>
                        {t("fileUpload.uploading")}
                    </Typography>
                </Box>
            )}

            {isUploaded && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 2,
                        color: "success.main",
                    }}
                >
                    <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="caption">
                        {t("fileUpload.success")}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
