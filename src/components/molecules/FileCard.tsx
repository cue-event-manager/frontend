import {
    Paper,
    Box,
    IconButton,
    Typography,
    Tooltip,
    LinearProgress,
    TextField,
    Fade,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TableChartIcon from "@mui/icons-material/TableChart";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useEffect, useState } from "react";

export interface FileCardProps {
    name: string;
    contentType?: string;
    size?: number;
    uploading?: boolean;
    uploaded?: boolean;
    onDelete?: () => void;
    onRename?: (newName: string) => void;
}

export default function FileCard({
    name,
    contentType,
    size,
    uploading,
    uploaded,
    onDelete,
    onRename,
}: FileCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(name);

    useEffect(() => {
        setTempName(name);
    }, [name]);

    const getFileIcon = (type?: string) => {
        const normalizedType = type?.toLowerCase() ?? "";
        const extension = name?.split(".").pop()?.toLowerCase() ?? "";
        const matches = (patterns: string[]) =>
            patterns.some(
                (pattern) =>
                    normalizedType.includes(pattern) || extension === pattern.toLowerCase(),
            );

        if (matches(["pdf"])) return <PictureAsPdfIcon color="error" sx={{ fontSize: 28 }} />;
        if (matches(["image", "png", "jpg", "jpeg", "gif", "webp", "bmp"]))
            return <ImageIcon color="primary" sx={{ fontSize: 28 }} />;
        if (matches(["ppt", "pptx", "presentation"]))
            return <SlideshowIcon color="warning" sx={{ fontSize: 28 }} />;
        if (matches(["xls", "xlsx", "csv", "spreadsheet"]))
            return <TableChartIcon color="success" sx={{ fontSize: 28 }} />;
        if (matches(["doc", "docx", "word"]))
            return <DescriptionIcon color="info" sx={{ fontSize: 28 }} />;
        if (matches(["zip", "rar", "7z", "gzip", "tar"]))
            return <FolderZipIcon color="secondary" sx={{ fontSize: 28 }} />;

        return <InsertDriveFileIcon color="action" sx={{ fontSize: 28 }} />;
    };

    const commitRename = () => {
        const trimmed = tempName.trim();
        const finalValue = trimmed || name;
        setIsEditing(false);
        setTempName(finalValue);
        if (finalValue !== name) {
            onRename?.(finalValue);
        }
    };

    return (
        <Fade in>
            <Paper
                elevation={1}
                sx={(theme) => ({
                    borderRadius: 2.5,
                    border: "1px solid",
                    borderColor: alpha(theme.palette.divider, 0.25),
                    backgroundColor: alpha(theme.palette.background.paper, 0.85),
                    transition: "all 0.25s ease",
                    "&:hover": { boxShadow: 3, transform: "translateY(-2px)" },
                    position: "relative",
                })}
            >
                {uploading && (
                    <LinearProgress
                        color="primary"
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            borderTopLeftRadius: 2.5,
                            borderTopRightRadius: 2.5,
                        }}
                    />
                )}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2.5,
                    }}
                >
                    {uploaded ? (
                        <CheckCircleIcon color="success" sx={{ fontSize: 28 }} />
                    ) : (
                        getFileIcon(contentType)
                    )}

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        {isEditing ? (
                            <TextField
                                fullWidth
                                size="small"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                onBlur={commitRename}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        commitRename();
                                    }
                                    if (e.key === "Escape") {
                                        e.preventDefault();
                                        setTempName(name);
                                        setIsEditing(false);
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 600,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer",
                                    "&:hover": { textDecoration: "underline" },
                                }}
                                onDoubleClick={() => setIsEditing(true)}
                            >
                                {name}
                            </Typography>
                        )}
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "0.8rem" }}
                        >
                            {contentType || "Sin tipo"}
                            {size ? ` — ${(size / 1024 / 1024).toFixed(2)} MB` : ""}
                        </Typography>
                    </Box>

                    {onDelete && (
                        <Tooltip title="Eliminar archivo">
                            <IconButton
                                color="error"
                                size="small"
                                onClick={onDelete}
                                sx={{
                                    "&:hover": { backgroundColor: "error.light", color: "white" },
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Paper>
        </Fade>
    );
}
