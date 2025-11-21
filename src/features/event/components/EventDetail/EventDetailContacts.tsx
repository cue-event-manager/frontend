import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";
import type { EventExtraContact } from "@/domain/event/EventExtraContact";
import { SectionCard } from "./SectionCard";

export function EventDetailContacts({ contacts }: { contacts: EventExtraContact[] }) {
    if (!contacts || contacts.length === 0) return null;
    const { t } = useTranslation();

    return (
        <SectionCard>
            <Stack spacing={2}>
                <Typography variant="h6" fontWeight={700}>
                    {t("events.detail.contacts")}
                </Typography>
                <Stack spacing={1}>
                    {contacts.map((contact, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                borderRadius: 3,
                                border: "1px solid",
                                borderColor: "divider",
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(99, 102, 241, 0.02))",
                            }}
                        >
                            <Avatar sx={{ bgcolor: "primary.soft", width: 44, height: 44 }}>
                                <PersonIcon color="primary" />
                            </Avatar>
                            <Stack spacing={0.5} flex={1}>
                                <Typography fontWeight={700}>{contact.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {contact.email || t("events.detail.noEmail")}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {contact.phone || t("events.detail.noPhone")}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    disabled={!contact.email}
                                    component="a"
                                    href={contact.email ? `mailto:${contact.email}` : undefined}
                                >
                                    <EmailIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    disabled={!contact.phone}
                                    component="a"
                                    href={contact.phone ? `tel:${contact.phone}` : undefined}
                                >
                                    <PhoneIcon fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Stack>
        </SectionCard>
    );
}
