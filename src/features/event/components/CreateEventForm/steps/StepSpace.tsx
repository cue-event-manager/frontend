import { useFormContext } from "react-hook-form";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActionArea,
    Switch,
    FormControlLabel,
    Divider,
    CircularProgress,
    Alert,
    Grid,
    Chip,
    Stack,
    TextField,
    Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useTranslation } from "react-i18next";
import { SearchSelect } from "@/components/molecules/SearchSelect";
import { useAllCampuses } from "@/features/campus/hooks/useAllCampuses";
import { useAllAvailableSpaces } from "@/features/space/hooks/useAllAvailableSpaces";
import { useAllSpaces } from "@/features/space/hooks/useAllSpaces";
import type { EventFormData } from "@/shared/validation/eventSchema";
import { useMemo, useState } from "react";
import type { GetAvailableSpacesRequestDto } from "@/domain/space/GetAvailableSpacesRequestDto";
import type { RecurrenceType } from "@/domain/event/enums/RecurrenceType";
import { FormSection, FormSectionAlert } from "../components/FormSection";
import type { Space } from "@/domain/space/Space";

export default function StepSpace() {
    const { setValue, watch, register } = useFormContext<EventFormData>();

    const requiresSpace = watch("requiresSpace");
    const isRecurrent = watch("isRecurrent");

    if (!requiresSpace) {
        return <VirtualSpaceSection register={register} />;
    }

    if (isRecurrent) {
        return <RecurrentSpaceSection setValue={setValue} watch={watch} />;
    }

    return <SingleSpaceSection setValue={setValue} watch={watch} />;
}

function VirtualSpaceSection({ register }: { register: any }) {
    const { t } = useTranslation();

    return (
        <FormSection
            title={t("events.sections.space")}
            subtitle={t("events.sections.spaceSelection", "Define cómo participarás")}
        >
            <FormSectionAlert
                severity="info"
                icon={<InfoOutlinedIcon fontSize="small" />}
                description={t(
                    "events.hints.noPhysicalSpaceRequired",
                    "Esta modalidad no requiere espacio físico. Puedes ingresar un enlace de reunión o ubicación virtual."
                )}
                sx={{ mb: 3 }}
            />

            <TextField
                fullWidth
                label={t("events.fields.virtualMeetingLink")}
                placeholder="https://meet.google.com/..."
                {...register("virtualMeetingLink")}
            />
        </FormSection>
    );
}

function RecurrentSpaceSection({ setValue, watch }: { setValue: any; watch: any }) {
    const { t } = useTranslation();
    const [requireFullAvailability, setRequireFullAvailability] = useState(false);
    const [selectedCampus, setSelectedCampus] = useState<number | null>(null);

    const minCapacity = watch("capacity");
    const recurrenceType = watch("recurrenceType");
    const startDate = watch("startDate");
    const endDate = watch("endDate");
    const startTime = watch("startTime");
    const endTime = watch("endTime");
    const selectedSpaceId = watch("spaceId");

    const campuses = useAllCampuses();

    const availableQuery = useMemo<GetAvailableSpacesRequestDto>(
        () => ({
            minCapacity: minCapacity ? Number(minCapacity) : undefined,
            campusId: selectedCampus ?? undefined,
            recurrenceType: recurrenceType
                ? (recurrenceType as unknown as RecurrenceType)
                : undefined,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            startTime: startTime || undefined,
            endTime: endTime || undefined,
        }),
        [minCapacity, selectedCampus, recurrenceType, startDate, endDate, startTime, endTime]
    );

    const allQuery = useMemo(
        () => ({ campusId: selectedCampus ?? undefined }),
        [selectedCampus]
    );

    const spacesQuery = useSpacesFetcher({
        useAvailable: requireFullAvailability,
        availableQuery,
        allQuery,
    });

    const isQueryComplete = !!(
        minCapacity &&
        startDate &&
        endDate &&
        startTime &&
        endTime
    );

    const handleSelectSpace = (spaceId: number) => {
        setValue("spaceId", spaceId, { shouldValidate: true });
    };

    return (
        <FormSection
            title={t("events.sections.space")}
            subtitle={t("events.sections.spaceSelection")}
        >
            <FormSectionAlert
                severity="warning"
                icon={<WarningAmberIcon fontSize="small" />}
                title={t("events.hints.recurrentSpaceTitle", "Evento Recurrente")}
                description={t(
                    "events.hints.recurrentSpaceDescription",
                )}
                sx={{ mb: 3 }}
            />

            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    mb: 3,
                }}
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="flex-start"
                    justifyContent="space-between"
                    spacing={3}
                    sx={{ mb: 3 }}
                >
                    <Box sx={{ flex: 1, minWidth: 250 }}>
                        <SearchSelect
                            label={t("events.fields.campus")}
                            value={selectedCampus}
                            onChange={(val) => setSelectedCampus(val as number | null)}
                            options={
                                campuses.data?.map((c) => ({
                                    label: c.name,
                                    value: c.id,
                                })) ?? []
                            }
                            loading={campuses.isLoading}
                            placeholder={t("common.actions.select")}
                        />
                    </Box>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={requireFullAvailability}
                                onChange={(e) => setRequireFullAvailability(e.target.checked)}
                                color="primary"
                            />
                        }
                        label={
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {t("events.fields.requireFullAvailability")}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {t(
                                        "events.hints.requireFullAvailabilityDescription",
                                        "Solo mostrar espacios disponibles en todas las fechas del evento"
                                    )}
                                </Typography>
                            </Box>
                        }
                        sx={{
                            alignItems: "flex-start",
                            m: 0,
                            "& .MuiFormControlLabel-label": { ml: 1 },
                        }}
                    />
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {requireFullAvailability && !isQueryComplete ? (
                    <Alert
                        severity="info"
                        icon={<InfoOutlinedIcon />}
                        sx={{ borderRadius: 2, mb: 3 }}
                    >
                        {t(
                            "events.hints.completeScheduleFirst",
                            "Completa primero la información de horarios para ver espacios disponibles"
                        )}
                    </Alert>
                ) : (
                    <SpacesList
                        spaces={spacesQuery.data}
                        isLoading={spacesQuery.isLoading}
                        selectedSpaceId={selectedSpaceId}
                        onSelectSpace={handleSelectSpace}
                        isRecurrent
                        requireFullAvailability={requireFullAvailability}
                        startDate={startDate ? new Date(startDate) : null}
                        endDate={endDate ? new Date(endDate) : null}
                        startTime={startTime}
                        endTime={endTime}
                        recurrenceType={(recurrenceType as string) ?? null}
                        capacity={minCapacity ? Number(minCapacity) : null}
                    />
                )}
            </Paper>

        </FormSection>
    );
}

function useSpacesFetcher({
    useAvailable,
    availableQuery,
    allQuery,
}: {
    useAvailable: boolean;
    availableQuery: GetAvailableSpacesRequestDto;
    allQuery: { campusId?: number };
}) {
    return useAvailable
        ? useAllAvailableSpaces(availableQuery)
        : useAllSpaces(allQuery);
}

function SingleSpaceSection({ setValue, watch }: { setValue: any; watch: any }) {
    const { t } = useTranslation();
    const [selectedCampus, setSelectedCampus] = useState<number | null>(null);

    const minCapacity = watch("capacity");
    const date = watch("date");
    const startTime = watch("startTime");
    const endTime = watch("endTime");
    const selectedSpaceId = watch("spaceId");

    const campuses = useAllCampuses();

    const query = useMemo<GetAvailableSpacesRequestDto>(
        () => ({
            minCapacity: minCapacity ? Number(minCapacity) : undefined,
            campusId: selectedCampus ?? undefined,
            date: date ? new Date(date) : undefined,
            startTime: startTime || undefined,
            endTime: endTime || undefined,
        }),
        [minCapacity, selectedCampus, date, startTime, endTime]
    );

    const spaces = useAllAvailableSpaces(query);

    const handleSelectSpace = (spaceId: number) => {
        setValue("spaceId", spaceId, { shouldValidate: true });
    };


    return (
        <FormSection
            title={t("events.sections.space")}
            subtitle={t("events.sections.spaceSelection")}
        >
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="flex-start"
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Box sx={{ flex: 1, minWidth: 250 }}>
                        <SearchSelect
                            label={t("events.fields.campus")}
                            value={selectedCampus}
                            onChange={(val) => setSelectedCampus(val as number | null)}
                            options={
                                campuses.data?.map((c) => ({
                                    label: c.name,
                                    value: c.id,
                                })) ?? []
                            }
                            loading={campuses.isLoading}
                            placeholder={t("common.actions.select")}
                        />
                    </Box>
                </Stack>

                <Divider sx={{ mb: 3 }} />

                <SpacesList
                    spaces={spaces.data}
                    isLoading={spaces.isLoading}
                    selectedSpaceId={selectedSpaceId}
                    onSelectSpace={handleSelectSpace}
                    isRecurrent={false}
                    requireFullAvailability={false}
                    date={date ? new Date(date) : null}
                    startTime={startTime}
                    endTime={endTime}
                    capacity={minCapacity ? Number(minCapacity) : null}
                />
            </Paper>
        </FormSection>
    );
}


function SpacesList({
    spaces,
    isLoading,
    selectedSpaceId,
    onSelectSpace,
    isRecurrent,
    requireFullAvailability,
    date,
    startTime,
    endTime,
    capacity,
    startDate,
    endDate,
    recurrenceType,
}: {
    spaces: any[] | undefined;
    isLoading: boolean;
    selectedSpaceId: number | undefined;
    onSelectSpace: (id: number) => void;
    isRecurrent: boolean;
    requireFullAvailability: boolean;
    date?: Date | null;
    startTime?: string | null;
    endTime?: string | null;
    capacity?: number | null;
    startDate?: Date | null;
    endDate?: Date | null;
    recurrenceType?: string | null;
}) {
    const { t, i18n } = useTranslation();

    const dateFormatter = useMemo(
        () => new Intl.DateTimeFormat(i18n.language, { dateStyle: "medium" }),
        [i18n.language]
    );

    const singleDateLabel = formatDateLabel(date, dateFormatter);
    const recurrenceStartLabel = formatDateLabel(startDate, dateFormatter);
    const recurrenceEndLabel = formatDateLabel(endDate, dateFormatter);
    const recurrenceTypeLabel = recurrenceType
        ? t(`events.recurrence.${recurrenceType.toLowerCase()}`, recurrenceType)
        : null;
    const capacityLabel = capacity ?? t("events.labels.capacity").toLowerCase();
    const startTimeLabel = startTime || "--:--";
    const endTimeLabel = endTime || "--:--";

    return (
        <Box>
            <Typography
                variant="subtitle1"
                sx={{ mb: 2.5, fontWeight: 600, color: "text.primary" }}
            >
                {t("events.labels.availableSpaces")}
            </Typography>

            {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                    <CircularProgress size={48} />
                </Box>
            ) : spaces && spaces.length > 0 ? (
                <Grid container spacing={3}>
                    {spaces.map((space) => {
                        const isSelected = selectedSpaceId === space.id;
                        return (
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={space.id}>
                                <SpaceCard
                                    space={space}
                                    selected={isSelected}
                                    onSelect={() => onSelectSpace(space.id)}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            ) : (
                <Alert
                    severity={isRecurrent && !requireFullAvailability ? "info" : "warning"}
                    sx={{ borderRadius: 2, py: 2 }}
                >
                    {isRecurrent && requireFullAvailability
                        ? t(
                            "events.messages.noSpacesFullyAvailableForSchedule",
                            "No hay espacios con disponibilidad total del {{startDate}} al {{endDate}} en el horario {{startTime}}-{{endTime}} con capacidad para {{capacity}} personas. Desactiva 'Disponibilidad Total' para ver opciones parciales y ajustarlas luego.",
                            {
                                startDate: recurrenceStartLabel ?? "N/D",
                                endDate: recurrenceEndLabel ?? "N/D",
                                startTime: startTimeLabel,
                                endTime: endTimeLabel,
                                capacity: capacityLabel,
                            }
                        )
                        : isRecurrent
                            ? t(
                                "events.messages.noSpacesForRecurrentDates",
                                "No hay espacios disponibles del {{startDate}} al {{endDate}} ({{recurrenceType}}) en el horario {{startTime}}-{{endTime}} con capacidad para {{capacity}} personas.",
                                {
                                    startDate: recurrenceStartLabel ?? "N/D",
                                    endDate: recurrenceEndLabel ?? "N/D",
                                    startTime: startTimeLabel,
                                    endTime: endTimeLabel,
                                    capacity: capacityLabel,
                                    recurrenceType: recurrenceTypeLabel ?? t("events.labels.unknownType"),
                                }
                            )
                            : t(
                                "events.messages.noSpacesForSelectedDate",
                                "No hay espacios disponibles el {{date}} de {{startTime}} a {{endTime}} con capacidad para {{capacity}} personas.",
                                {
                                    date: singleDateLabel ?? "N/D",
                                    startTime: startTimeLabel,
                                    endTime: endTimeLabel,
                                    capacity: capacityLabel,
                                }
                            )}
                </Alert>
            )}
        </Box>
    );
}

function formatDateLabel(value: Date | string | null | undefined, formatter: Intl.DateTimeFormat) {
    if (!value) return null;
    const parsed = value instanceof Date ? value : new Date(value);
    if (isNaN(parsed.getTime())) return null;
    return formatter.format(parsed);
}

function SpaceCard({
    space,
    selected,
    onSelect,
}: {
    space: any;
    selected: boolean;
    onSelect: () => void;
}) {
    const { t } = useTranslation();

    return (
        <Card
            variant="outlined"
            sx={{
                position: "relative",
                height: "100%",
                borderRadius: 2.5,
                borderWidth: 2,
                borderColor: selected ? "primary.main" : "grey.200",
                backgroundColor: selected ? "primary.50" : "background.paper",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                    borderColor: selected ? "primary.dark" : "primary.light",
                    boxShadow: 4,
                    transform: "translateY(-4px)",
                },
            }}
        >
            <CardActionArea
                onClick={onSelect}
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "flex-start",
                }}
            >
                <Box
                    sx={{
                        p: 2.5,
                        pb: 1.5,
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
                        <Box
                            sx={{
                                p: 1.2,
                                borderRadius: 2,
                                backgroundColor: selected ? "primary.main" : "primary.50",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <MeetingRoomIcon
                                sx={{
                                    fontSize: 24,
                                    color: selected ? "white" : "primary.main",
                                }}
                            />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "1.1rem",
                                    color: "text.primary",
                                    mb: 0.3,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {space.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "text.secondary",
                                    fontWeight: 500,
                                    textTransform: "uppercase",
                                    letterSpacing: 0.5,
                                }}
                            >
                                {space.type?.name ?? t("events.labels.unknownType")}
                            </Typography>
                        </Box>
                    </Box>

                    {selected && (
                        <CheckCircleIcon
                            sx={{
                                fontSize: 28,
                                color: "primary.main",
                                flexShrink: 0,
                            }}
                        />
                    )}
                </Box>

                <Divider sx={{ mx: 2.5 }} />

                <CardContent sx={{ p: 2.5, pt: 2, flex: 1 }}>
                    <Stack spacing={1.5}>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            <Chip
                                icon={<PeopleAltIcon sx={{ fontSize: 18 }} />}
                                label={`${space.capacity} ${t("events.labels.capacity")}`}
                                size="medium"
                                sx={{
                                    fontWeight: 600,
                                    backgroundColor: selected ? "white" : "primary.50",
                                    color: "primary.main",
                                    borderColor: "primary.main",
                                    "& .MuiChip-icon": {
                                        color: "primary.main",
                                    },
                                }}
                            />

                            <Chip
                                icon={<BuildCircleIcon sx={{ fontSize: 18 }} />}
                                label={`${space.resources?.length || 0} ${t(
                                    "events.labels.resources"
                                )}`}
                                size="medium"
                                sx={{
                                    fontWeight: 600,
                                    backgroundColor: selected ? "white" : "secondary.50",
                                    color: "secondary.main",
                                    borderColor: "secondary.main",
                                    "& .MuiChip-icon": {
                                        color: "secondary.main",
                                    },
                                }}
                            />
                        </Box>

                        {space.campus && (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.8,
                                    mt: 0.5,
                                }}
                            >
                                <LocationOnIcon
                                    sx={{
                                        fontSize: 18,
                                        color: "text.secondary",
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "text.secondary",
                                        fontWeight: 500,
                                    }}
                                >
                                    {space.campus.name}
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
