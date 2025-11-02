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
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";
import { SearchSelect } from "@/components/molecules/SearchSelect";
import { useAllCampuses } from "@/features/campus/hooks/useAllCampuses";
import { useAllAvailableSpaces } from "@/features/space/hooks/useAllAvailableSpaces";
import type { EventFormData } from "@/shared/validation/eventSchema";
import { useMemo, useState } from "react";
import type { GetAvailableSpacesRequestDto } from "@/domain/space/GetAvailableSpacesRequestDto";
import type { RecurrenceType } from "@/domain/event/enums/RecurrenceType";

export default function StepSpace() {
    const { t } = useTranslation();
    const { setValue, watch } = useFormContext<EventFormData>();

    const isRecurrent = watch("isRecurrent");
    const minCapacity = watch("capacity");
    const recurrenceType = watch("recurrenceType");
    const date = watch("date");
    const startDate = watch("startDate");
    const endDate = watch("endDate");
    const startTime = watch("startTime");
    const endTime = watch("endTime");
    const selectedSpaceId = watch("spaceId");

    const [requireFullAvailability, setRequireFullAvailability] = useState(false);
    const [selectedCampus, setSelectedCampus] = useState<number | null>(null);

    const campuses = useAllCampuses();

    const query = useMemo<GetAvailableSpacesRequestDto>(() => {
        const base = {
            minCapacity: minCapacity ? Number(minCapacity) : undefined,
            campusId: selectedCampus ?? undefined,
        };

        if (requireFullAvailability && isRecurrent) {
            return base;
        }

        if (!isRecurrent) {
            return {
                ...base,
                date: date ? new Date(date) : undefined,
                startTime: startTime || undefined,
                endTime: endTime || undefined,
            };
        }

        return {
            ...base,
            recurrenceType: recurrenceType
                ? (recurrenceType as unknown as RecurrenceType)
                : undefined,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            startTime: startTime || undefined,
            endTime: endTime || undefined,
        };
    }, [
        isRecurrent,
        minCapacity,
        selectedCampus,
        recurrenceType,
        date,
        startDate,
        endDate,
        startTime,
        endTime,
        requireFullAvailability,
    ]);

    const spaces = useAllAvailableSpaces(query);

    const handleSelectSpace = (spaceId: number) => {
        setValue("spaceId", spaceId, { shouldValidate: true });
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                {t("events.sections.space")}
            </Typography>


                <Stack direction="row" spacing={2}  alignItems="start" flexWrap="wrap">
                    <Box sx={{ flex: "1", minWidth:100 }}>
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

                    {isRecurrent && (
                        <Box sx={{ flex: "0 0 auto" }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={requireFullAvailability}
                                        onChange={(e) => setRequireFullAvailability(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {t("events.fields.requireFullAvailability")}
                                    </Typography>
                                }
                            />
                        </Box>
                    )}
                </Stack>

            <Box>
                <Typography variant="subtitle1" sx={{ mb: 2.5, fontWeight: 600, color: "text.primary" }}>
                    {t("events.labels.availableSpaces")}
                </Typography>

                {spaces.isLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                        <CircularProgress size={48} />
                    </Box>
                ) : spaces.data && spaces.data.length > 0 ? (
                    <Grid container spacing={3}>
                        {spaces.data.map((space) => {
                            const isSelected = selectedSpaceId === space.id;

                            return (
                                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={space.id}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            position: "relative",
                                            height: "100%",
                                            borderRadius: 2.5,
                                            borderWidth: 2,
                                            borderColor: isSelected ? "primary.main" : "grey.200",
                                            backgroundColor: isSelected ? "primary.50" : "background.paper",
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            "&:hover": {
                                                borderColor: isSelected ? "primary.dark" : "primary.light",
                                                boxShadow: 4,
                                                transform: "translateY(-4px)",
                                            },
                                        }}
                                    >
                                        <CardActionArea
                                            onClick={() => handleSelectSpace(space.id)}
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
                                                            backgroundColor: isSelected ? "primary.main" : "primary.50",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <MeetingRoomIcon
                                                            sx={{
                                                                fontSize: 24,
                                                                color: isSelected ? "white" : "primary.main",
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
                                                                whiteSpace: "nowrap",
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

                                                {isSelected && (
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
                                                                backgroundColor: isSelected ? "white" : "primary.50",
                                                                color: "primary.main",
                                                                borderColor: "primary.main",
                                                                "& .MuiChip-icon": {
                                                                    color: "primary.main",
                                                                },
                                                            }}
                                                        />

                                                        <Chip
                                                            icon={<BuildCircleIcon sx={{ fontSize: 18 }} />}
                                                            label={`${space.resources?.length || 0} ${t("events.labels.resources")}`}
                                                            size="medium"
                                                            sx={{
                                                                fontWeight: 600,
                                                                backgroundColor: isSelected ? "white" : "secondary.50",
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
                                </Grid>
                            );
                        })}
                    </Grid>
                ) : (
                    <Alert
                        severity="info"
                        sx={{
                            borderRadius: 2,
                            py: 2,
                        }}
                    >
                        {t("events.messages.noSpacesFound")}
                    </Alert>
                )}
            </Box>
        </Box>
    );
}