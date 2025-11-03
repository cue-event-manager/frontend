import {
    Box,
    Typography,
    Paper,
    Divider,
    Grid,
    Stack,
    Chip,
    Avatar,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { EventFormData } from "@/shared/validation/eventSchema";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { alpha } from "@mui/material/styles";



export default function StepSummary() {
    const { getValues } = useFormContext<EventFormData>();
    const {t} = useTranslation();

    const data = getValues();

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                {t("events.sections.summary")}
            </Typography>

            <BasicInfoSection data={data} />
            <ScheduleSection data={data} />
            <OrganizerSection data={data} />
            <AttachmentsSection data={data} />
        </Box>
    );
}


function SectionContainer({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Paper
            elevation={1}
            sx={(theme) => ({
                borderRadius: 3,
                border: "1px solid",
                borderColor: alpha(theme.palette.divider, 0.2),
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                p: { xs: 2.5, sm: 3 },
                mb: 3,
            })}
        >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {title}
            </Typography>
            {children}
        </Paper>
    );
}

function BasicInfoSection({ data }: { data: EventFormData }) {
    const { t } = useTranslation();

    return (
        <SectionContainer title={t("events.sections.basicInfo")}>
            <Stack spacing={1}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.description || t("common.labels.noDescription")}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                            {t("events.fields.category")}
                        </Typography>
                        <Typography>{data.categoryId || t("common.labels.unknown")}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                            {t("events.fields.modality")}
                        </Typography>
                        <Typography>{data.modalityId || t("common.labels.unknown")}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                            {t("events.fields.capacity")}
                        </Typography>
                        <Typography>{data.capacity || t("common.labels.unknown")}</Typography>
                    </Grid>
                </Grid>
            </Stack>
        </SectionContainer>
    );
}

/* -------- Schedule Section -------- */
function ScheduleSection({ data }: { data: EventFormData }) {
    const { t } = useTranslation();

    return (
        <SectionContainer title={t("events.sections.schedule")}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip
                    icon={<CalendarMonthIcon />}
                    label={
                        data.isRecurrent
                            ? `${t("events.fields.startDate")}: ${data.startDate} → ${data.endDate}`
                            : `${t("events.fields.date")}: ${data.date}`
                    }
                    variant="outlined"
                />
                <Chip
                    icon={<AccessTimeIcon />}
                    label={`${data.startTime} - ${data.endTime}`}
                    variant="outlined"
                />
                {data.isRecurrent && data.recurrenceType && (
                    <Chip label={t(`events.recurrence.${data.recurrenceType.toLowerCase()}`)} />
                )}
            </Stack>
        </SectionContainer>
    );
}

/* -------- Organizer Section -------- */
function OrganizerSection({ data }: { data: EventFormData }) {
    const { t } = useTranslation();
    const o = data.organizer;

    return (
        <SectionContainer title={t("events.sections.organizer")}>
            <Stack spacing={1.5}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {o.name || t("common.labels.unknown")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {o.email || t("common.labels.noEmail")}
                        </Typography>
                    </Box>
                </Stack>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    {o.type === "INTERNAL"
                        ? t("events.organizerType.internal")
                        : t("events.organizerType.external")}
                </Typography>

                {o.type === "INTERNAL" ? (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Typography variant="body2" color="text.secondary">
                                {t("events.fields.faculty")}
                            </Typography>
                            <Typography>{o.internalFacultyId || "-"}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Typography variant="body2" color="text.secondary">
                                {t("events.fields.program")}
                            </Typography>
                            <Typography>{o.internalProgramId || "-"}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Typography variant="body2" color="text.secondary">
                                {t("events.fields.academicArea")}
                            </Typography>
                            <Typography>{o.internalAcademicAreaId || "-"}</Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Stack spacing={0.5}>
                        <Typography>
                            {o.externalOrganizationName || t("common.labels.noOrganization")}
                        </Typography>
                        <Typography color="text.secondary">{o.externalOrganizationWebsite}</Typography>
                    </Stack>
                )}
            </Stack>
        </SectionContainer>
    );
}

/* -------- Attachments & Contacts Section -------- */
function AttachmentsSection({ data }: { data: EventFormData }) {
    const { t } = useTranslation();
    const attachments = data.attachments || [];
    const contacts = data.extraContacts || [];

    return (
        <SectionContainer title={t("events.sections.attachments")}>
            <Stack spacing={2}>
                {attachments.length > 0 ? (
                    attachments.map((a, i) => (
                        <Stack key={i} direction="row" alignItems="center" spacing={1.5}>
                            <AttachFileIcon fontSize="small" color="primary" />
                            <Typography variant="body2">{a.name}</Typography>
                        </Stack>
                    ))
                ) : (
                    <Typography color="text.secondary" variant="body2">
                        {t("events.labels.noAttachments")}
                    </Typography>
                )}

                <Divider sx={{ my: 1.5 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {t("events.sections.extraContacts")}
                </Typography>

                {contacts.length > 0 ? (
                    contacts.map((c, i) => (
                        <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                            <ContactMailIcon fontSize="small" color="secondary" />
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {c.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {c.email}
                                </Typography>
                            </Box>
                        </Stack>
                    ))
                ) : (
                    <Typography color="text.secondary" variant="body2">
                        {t("events.labels.noContacts")}
                    </Typography>
                )}
            </Stack>
        </SectionContainer>
    );
}
