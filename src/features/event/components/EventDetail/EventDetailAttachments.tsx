import {
    Stack,
    Typography,
    IconButton,
    Chip,
    Link as MuiLink,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DescriptionIcon from "@mui/icons-material/Description";
import TableChartIcon from "@mui/icons-material/TableChart";
import DownloadIcon from "@mui/icons-material/Download";
import { SectionCard } from "./SectionCard";
import { useTranslation } from "react-i18next";
import type { EventAttachment } from "@/domain/event/EventAttachment";
import { getEventImageUrl } from "../../constants/media.constant";

export function EventDetailAttachments({ attachments }: { attachments: EventAttachment[] }) {
    if (!attachments || attachments.length === 0) return null;
    const { t } = useTranslation();

    const getIcon = (type: string) => {
        if (type.toLowerCase().includes("pdf")) return <PictureAsPdfIcon color="error" />;
        if (type.toLowerCase().includes("image")) return <ImageIcon color="primary" />;
        if (type.toLowerCase().includes("word") || type.includes("msword")) return <DescriptionIcon color="primary" />;
        if (type.toLowerCase().includes("excel") || type.includes("spreadsheet")) return <TableChartIcon color="success" />;
        return <InsertDriveFileIcon color="action" />;
    };

    return (
        <SectionCard>
            <Stack spacing={2}>
                <Typography variant="h6" fontWeight={700}>
                    {t("events.detail.attachments")}
                </Typography>

                <Stack spacing={1}>
                    {attachments.map((attachment, idx) => {
                        const icon = getIcon(attachment.contentType);

                        return (
                            <Stack
                                key={idx}
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{
                                    borderRadius: 3,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    p: 2,
                                    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(99, 102, 241, 0.02))",
                                }}
                            >
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    {icon}
                                    <Stack>
                                        <MuiLink
                                            href={getEventImageUrl(attachment.filePath)} 
                                            target="_blank"
                                            rel="noopener"
                                            underline="hover"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {attachment.name}
                                        </MuiLink>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ textTransform: "uppercase" }}
                                        >
                                            {attachment.contentType}
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <IconButton
                                    href={getEventImageUrl(attachment.filePath)}
                                    download={attachment.name}
                                    aria-label="Download"
                                >
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>
                        );
                    })}
                </Stack>
            </Stack>
        </SectionCard>
    );
}
