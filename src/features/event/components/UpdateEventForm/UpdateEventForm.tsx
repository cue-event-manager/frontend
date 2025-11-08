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
    DialogContentText,
    DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useUpdateEvent } from "../../hooks/useUpdateEvent";
import { useUpdateRecurrentEvent } from "../../hooks/useUpdateRecurrentEvent";
import type { Event } from "@/domain/event/Event";

import StepBasicInfo from "../CreateEventForm/steps/StepBasicInfo";
import {
    eventFormSchema,
    getStepSchema,
    type EventFormData,
} from "@/shared/validation/eventSchema";
import StepSchedule from "../CreateEventForm/steps/StepSchedule";
import StepSpace from "../CreateEventForm/steps/StepSpace";
import StepOrganizer from "../CreateEventForm/steps/StepOrganizer";
import StepAgenda from "../CreateEventForm/steps/StepAgenda";
import StepAttachments from "../CreateEventForm/steps/StepAttachments";
import StepSummary from "../CreateEventForm/steps/StepSummary";

interface UpdateEventFormProps {
    event: Event;
    onSuccess?: () => void;
}

export default function UpdateEventForm({ event, onSuccess }: UpdateEventFormProps) {
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(0);
    const [showRecurrentDialog, setShowRecurrentDialog] = useState(false);
    const [pendingData, setPendingData] = useState<any>(null);

    const updateEventMutation = useUpdateEvent();
    const updateRecurrentEventMutation = useUpdateRecurrentEvent();

    const isRecurrentEvent = event.recurrenceMode === "RECURRING" && event.recurrenceId;

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
            name: event.name ?? "",
            description: event.description ?? "",
            cost: event.cost ?? undefined,
            categoryId: event.categoryId ?? undefined,
            modalityId: event.modalityId ?? undefined,
            spaceId: event.spaceId ?? undefined,
            virtualMeetingLink: event.virtualMeetingLink ?? undefined,
            capacity: event.capacity ?? undefined,
            date: event.date ? new Date(event.date) : undefined,
            startDate: undefined,
            endDate: undefined,
            startTime: event.startTime ?? "",
            endTime: event.endTime ?? "",
            recurrenceType: event.recurrenceType ?? undefined,
            isRecurrent: event.recurrenceMode === "RECURRING",
            requiresSpace: event.spaceId ? true : false,
            imagePath: event.imagePath ?? undefined,
            organizer: {
                type: event.organizer?.type ?? "INTERNAL",
                name: event.organizer?.name ?? undefined,
                email: event.organizer?.email ?? undefined,
                phone: event.organizer?.phone ?? undefined,
                internalFacultyId: event.organizer?.internalFacultyId ?? undefined,
                internalProgramId: event.organizer?.internalProgramId ?? undefined,
                internalAcademicAreaId: event.organizer?.internalAcademicAreaId ?? undefined,
                externalOrganizationName: event.organizer?.externalOrganizationName ?? undefined,
                externalOrganizationWebsite: event.organizer?.externalOrganizationWebsite ?? undefined,
            },
            agenda: event.agenda ?? undefined,
            attachments: event.attachments ?? undefined,
            extraContacts: event.extraContacts ?? undefined,
        },
    });

    const {
        handleSubmit,
        trigger,
        formState: { isSubmitting, errors },
    } = form;

    const handleNext = async (e?: React.MouseEvent) => {
        e?.preventDefault();
        const stepSchema = getStepSchema(activeStep);
        const stepFields = Object.keys(stepSchema.fields);
        const isValid = await trigger(stepFields as any, { shouldFocus: true });

        if (isValid) {
            setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
        } else {
            console.warn("Step validation failed:", errors);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    const handleUpdateSingleEvent = (data: any) => {
        // Update only this event
        const updatePayload = {
            id: event.id,
            name: data.name,
            description: data.description,
            cost: data.cost,
            categoryId: data.categoryId,
            modalityId: data.modalityId,
            spaceId: data.spaceId,
            virtualMeetingLink: data.virtualMeetingLink,
            capacity: data.capacity,
            imagePath: data.imagePath,
            date: data.date ? new Date(data.date).toISOString().split('T')[0] : undefined,
            startTime: data.startTime,
            endTime: data.endTime,
            organizer: data.organizer,
            agenda: data.agenda,
            attachments: data.attachments,
            extraContacts: data.extraContacts,
        };

        updateEventMutation.mutate(updatePayload, {
            onSuccess: () => {
                setShowRecurrentDialog(false);
                setPendingData(null);
                onSuccess?.();
            }
        });
    };

    const handleUpdateAllEvents = (data: any) => {
        // Update all events in the series
        const updatePayload = {
            recurrenceId: event.recurrenceId!,
            name: data.name,
            description: data.description,
            cost: data.cost,
            categoryId: data.categoryId,
            modalityId: data.modalityId,
            spaceId: data.spaceId,
            virtualMeetingLink: data.virtualMeetingLink,
            capacity: data.capacity,
            imagePath: data.imagePath,
            startTime: data.startTime,
            endTime: data.endTime,
            organizer: data.organizer,
            agenda: data.agenda,
            attachments: data.attachments,
            extraContacts: data.extraContacts,
        };

        updateRecurrentEventMutation.mutate(updatePayload, {
            onSuccess: () => {
                setShowRecurrentDialog(false);
                setPendingData(null);
                onSuccess?.();
            }
        });
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            await eventFormSchema.validate(data, { abortEarly: false });

            const cleanedData = JSON.parse(
                JSON.stringify(data, (_k, v) => (v === null ? undefined : v))
            );

            // Check if this is a recurrent event
            if (isRecurrentEvent) {
                // Show dialog to ask user what to update
                setPendingData(cleanedData);
                setShowRecurrentDialog(true);
            } else {
                // Directly update single event
                handleUpdateSingleEvent(cleanedData);
            }
        } catch (error) {
            console.error("Final validation failed:", error);
        }
    });

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
                            disabled={isSubmitting || updateEventMutation.isPending}
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
                            disabled={isSubmitting || updateEventMutation.isPending}
                            sx={{ borderRadius: 2 }}
                        >
                            {t("common.actions.next")}
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting || updateEventMutation.isPending}
                            sx={{ borderRadius: 2 }}
                        >
                            {t("common.actions.update")}
                        </Button>
                    )}
                </Box>

                {/* Recurrent Event Update Dialog */}
                <Dialog
                    open={showRecurrentDialog}
                    onClose={() => setShowRecurrentDialog(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        {t("events.updateRecurrent.title")}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t("events.updateRecurrent.message")}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setShowRecurrentDialog(false)}
                            disabled={updateEventMutation.isPending || updateRecurrentEventMutation.isPending}
                        >
                            {t("common.actions.cancel")}
                        </Button>
                        <Button
                            onClick={() => pendingData && handleUpdateSingleEvent(pendingData)}
                            variant="outlined"
                            disabled={updateEventMutation.isPending || updateRecurrentEventMutation.isPending}
                        >
                            {t("events.updateRecurrent.onlyThis")}
                        </Button>
                        <Button
                            onClick={() => pendingData && handleUpdateAllEvents(pendingData)}
                            variant="contained"
                            disabled={updateEventMutation.isPending || updateRecurrentEventMutation.isPending}
                        >
                            {t("events.updateRecurrent.allSeries")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </FormProvider>
    );
}
