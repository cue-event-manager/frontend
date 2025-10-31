import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { CreateRecurrentEventRequestDto } from "@/domain/event/CreateRecurrentEventRequestDto";
import type { CreateSingleEventRequestDto } from "@/domain/event/CreateSingleEventRequestDto";
import { createRecurrentEvent, createSingleEvent } from "@/services/event.service";
import toast from "react-hot-toast";
import { EVENT_QUERY_KEYS } from "../constants/eventQueries.constant";



export default function useCreateEvent() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            payload: CreateSingleEventRequestDto | CreateRecurrentEventRequestDto
        ) => {
            const isRecurrent = "startDate" in payload && "endDate" in payload;

            if (isRecurrent) {
                return await createRecurrentEvent(payload as CreateRecurrentEventRequestDto);
            } else {
                return await createSingleEvent(payload as CreateSingleEventRequestDto);
            }
        },

        onSuccess: async (response) => {
            toast.success(t("events.messages.created"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.EVENTS.ROOT] }),
            ]);
            return response;
        },

        onError: () => { }, // TODO: Handle this error according to the response.
    });
}
