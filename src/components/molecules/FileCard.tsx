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
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

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

    const getFileIcon = (type?: string) => {
        if (!type) return <UploadFileIcon color="disabled" />;
        if (type.includes("pdf")) return <PictureAsPdfIcon color="error" />;
        if (type.includes("image")) return <ImageIcon color="primary" />;
        return <DescriptionIcon color="action" />;
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
                                onBlur={() => {
                                    setIsEditing(false);
                                    onRename?.(tempName);
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
