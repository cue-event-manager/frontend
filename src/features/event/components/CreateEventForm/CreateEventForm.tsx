import { useState, useMemo } from "react";
import {
    Box,
    Button,
    Stepper,
    Step,
    StepLabel,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import useCreateEvent from "../../hooks/useCreateEvent";
import StepBasicInfo from "./steps/StepBasicInfo";
import {
    eventFormSchema,
    getStepSchema,
    type EventFormData,
} from "@/shared/validation/eventSchema";
import StepSchedule from "./steps/StepSchedule";
import StepSpace from "./steps/StepSpace";
import StepOrganizer from "./steps/StepOrganizer";
import StepAgenda from "./steps/StepAgenda";
import StepAttachments from "./steps/StepAttachments";
import StepSummary from "./steps/StepSummary";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import type { CreateEventResponseDto } from "@/domain/event/CreateEventResponseDto";


interface CreateEventFormProps {
    onSuccess?: () => void;
}


export default function CreateEventForm({ onSuccess }: CreateEventFormProps) {
    const { t, i18n } = useTranslation();
    const [activeStep, setActiveStep] = useState(0);
    const createEventMutation = useCreateEvent();
    const [recurrentWarning, setRecurrentWarning] = useState<CreateEventResponseDto | null>(null);

    const steps = useMemo(
        () => [
            t("events.steps.basicInfo"),
            t("events.steps.schedule"),
            t("events.steps.space"),
            t("events.steps.organizer"),
            t("events.steps.agenda"),
            t("events.steps.attachments"),
            t("events.steps.summary"),
        ],
        [t]
    );

    const form = useAppForm<EventFormData>({
        resolver: yupResolver(eventFormSchema) as any,
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            cost: undefined,
            categoryId: undefined,
            modalityId: undefined,
            spaceId: undefined,
            capacity: undefined,
            date: undefined,
            startDate: undefined,
            endDate: undefined,
            startTime: "",
            endTime: "",
            recurrenceType: undefined,
            isRecurrent: false,
            requiresSpace: false,
            imagePath: undefined,
            organizer: {
                type: "INTERNAL",
                name: undefined,
                email: undefined,
                phone: undefined,
                internalFacultyId: undefined,
                internalProgramId: undefined,
                internalAcademicAreaId: undefined,
                externalOrganizationName: undefined,
                externalOrganizationWebsite: undefined,
            },
            agenda: undefined,
            attachments: undefined,
            extraContacts: undefined,
        },
    });

    const dateFormatter = useMemo(
        () => new Intl.DateTimeFormat(i18n.language, { dateStyle: "medium" }),
        [i18n.language]
    );

    const {
        handleSubmit,
        trigger,
        reset,
        formState: { isSubmitting, errors },
    } = form;

    const handleNext = async (e?: React.MouseEvent) => {
        e?.preventDefault();
        const stepSchema = getStepSchema(activeStep);
        const stepFields = Object.keys(stepSchema.fields);
        const isValid = await trigger(stepFields as any, { shouldFocus: true });

        if (isValid) {
            setActiveStep((prev) => {
                console.log("Now moving to step:", prev + 1);
                return Math.min(prev + 1, steps.length - 1);
            });
        } else {
            console.warn("Step validation failed:", errors);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            await eventFormSchema.validate(data, { abortEarly: false });

            const cleanedData = JSON.parse(
                JSON.stringify(data, (_k, v) => (v === null ? undefined : v))
            );

            const response = await createEventMutation.mutateAsync(cleanedData);

            if (response?.failedDates && response.failedDates.length > 0) {
                setRecurrentWarning(response);
                return;
            }

            handleFinalizeSuccess();
        } catch (error) {
            console.error("Final validation failed:", error);
        }
    });

    const handleFinalizeSuccess = () => {
        onSuccess?.();
        reset();
        setActiveStep(0);
    };

    const handleCloseWarning = () => {
        setRecurrentWarning(null);
        handleFinalizeSuccess();
    };


    return (
        <FormProvider {...form}>
            <Box component="form" onSubmit={onSubmit} noValidate>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ minHeight: 400 }}>
                    <Box sx={{ minHeight: 400 }}>
                        {activeStep === 0 && <StepBasicInfo />}
                        {activeStep === 1 && <StepSchedule />}
                        {activeStep === 2 && <StepSpace />}
                        {activeStep === 3 && <StepOrganizer />}
                        {activeStep === 4 && <StepAgenda />}
                        {activeStep === 5 && <StepAttachments />}
                        {activeStep === 6 && <StepSummary />}
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    {activeStep > 0 ? (
                        <Button
                            variant="outlined"
                            onClick={handleBack}
                            disabled={isSubmitting || createEventMutation.isPending}
                            sx={{ borderRadius: 2 }}
                        >
                            {t("common.actions.back")}
                        </Button>
                    ) : (
                        <Box />
                    )}

                    {activeStep < steps.length - 1 ? (
                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleNext}
                            disabled={isSubmitting || createEventMutation.isPending}
                            sx={{ borderRadius: 2 }}
                        >
                            {t("common.actions.next")}
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting || createEventMutation.isPending}
                            sx={{ borderRadius: 2 }}
                        >
                            {t("common.actions.create")}
                        </Button>
                    )}
                </Box>
            </Box>

            <RecurrentWarningDialog
                open={!!recurrentWarning}
                onClose={handleCloseWarning}
                data={recurrentWarning}
                formatDate={(date) => dateFormatter.format(new Date(date))}
            />
        </FormProvider>
    );
}

function RecurrentWarningDialog({
    open,
    onClose,
    data,
    formatDate,
}: {
    open: boolean;
    onClose: () => void;
    data: CreateEventResponseDto | null;
    formatDate: (date: Date | string) => string;
}) {
    const { t } = useTranslation();

    if (!data) return null;
    const failed = data.failedCount;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WarningAmberIcon color="warning" />
                <Typography variant="h6" component="span" fontWeight={700}>
                    {t("events.warnings.recurrentPartialTitle")}
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Typography sx={{ mb: 2 }}>
                    {t("events.warnings.recurrentPartialDescription", {
                        failed
                    })}
                </Typography>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    {t("events.warnings.recurrentPartialList")}
                </Typography>
                <List dense>
                    {data.failedDates.map(({ date, reason }, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <WarningAmberIcon color="warning" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary={formatDate(date)}
                                secondary={reason}
                                primaryTypographyProps={{ fontWeight: 600 }}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    {t("common.actions.close")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
