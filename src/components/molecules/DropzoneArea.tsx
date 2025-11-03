import { useState, type DragEvent } from "react";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { alpha } from "@mui/material/styles";

interface DropzoneAreaProps {
    onFilesDrop: (files: File[]) => void;
    label?: string;
    hint?: string;
    accept?: string;
    multiple?: boolean;
}

export default function DropzoneArea({
    onFilesDrop,
    label = "Arrastra o selecciona tus archivos",
    hint = "JPG, PNG, PDF, DOCX, XLSX, PPTX...",
    accept = "*/*",
    multiple = true,
}: DropzoneAreaProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files) as File[];
        onFilesDrop(files);
    };

    const handleSelectFiles = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = multiple;
        input.accept = accept;
        input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const fileList = target.files;
            if (!fileList) return;
            const files = Array.from(fileList) as File[];
            onFilesDrop(files);
        };
        input.click();
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
                backgroundColor: alpha(theme.palette.background.paper, isDragging ? 0.4 : 0.25),
                textAlign: "center",
                py: 5,
                px: 2,
                cursor: "pointer",
                transition: "all 0.25s ease",
                "&:hover": {
                    borderColor: theme.palette.primary.light,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
            })}
        >
            <CloudUploadIcon
                sx={(theme) => ({
                    fontSize: 56,
                    color: isDragging ? theme.palette.primary.main : "text.disabled",
                    mb: 1,
                })}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {hint}
            </Typography>
        </Box>
    );
}
