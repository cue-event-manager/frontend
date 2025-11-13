import { useCallback, useRef, useState, type DragEvent } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { alpha } from "@mui/material/styles";

interface DropzoneAreaProps {
    onFilesDrop: (files: File[]) => void;
    label?: string;
    hint?: string;
    accept?: string;
    multiple?: boolean;
    actionLabel?: string;
}

export default function DropzoneArea({
    onFilesDrop,
    label = "Arrastra o selecciona tus archivos",
    hint = "JPG, PNG, PDF, DOCX, XLSX, PPTX...",
    accept = "*/*",
    multiple = true,
    actionLabel = "Seleccionar archivos",
}: DropzoneAreaProps) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFiles = useCallback(
        (files: File[]) => {
            if (!files.length) return;
            onFilesDrop(multiple ? files : files.slice(0, 1));
        },
        [multiple, onFilesDrop],
    );

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files) as File[];
        handleFiles(files);
    };

    const handleSelectFiles = () => {
        inputRef.current?.click();
    };

    return (
        <Box
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={handleSelectFiles}
            sx={(theme) => ({
                border: "2px dashed",
                borderRadius: 3,
                borderColor: isDragging ? theme.palette.primary.main : theme.palette.divider,
                backgroundColor: alpha(
                    theme.palette.primary.light,
                    isDragging ? 0.1 : 0.05,
                ),
                textAlign: "center",
                py: { xs: 4, md: 5 },
                px: 3,
                cursor: "pointer",
                transition: "all 0.25s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.light, 0.15),
                },
            })}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                style={{ display: "none" }}
                onChange={(event) => {
                    const files = event.target.files;
                    if (!files) return;
                    handleFiles(Array.from(files));
                    event.target.value = "";
                }}
            />

            <Stack spacing={1.5} alignItems="center">
                <Box
                    sx={(theme) => ({
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: alpha(
                            isDragging ? theme.palette.primary.main : theme.palette.grey[400],
                            0.15,
                        ),
                        transition: "background-color 0.2s ease",
                    })}
                >
                    <CloudUploadIcon
                        sx={(theme) => ({
                            fontSize: 36,
                            color: isDragging ? theme.palette.primary.main : "text.disabled",
                        })}
                    />
                </Box>

                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {label}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
                    {hint}
                </Typography>

                <Button
                    variant="outlined"
                    size="small"
                    onClick={(event) => {
                        event.stopPropagation();
                        handleSelectFiles();
                    }}
                    sx={{ mt: 1 }}
                >
                    {actionLabel}
                </Button>
            </Stack>
        </Box>
    );
}
