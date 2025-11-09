import axiosInstance from "@/config/axiosConfig";
import { EVENT_SERVICE } from "./constants";

const EVENT_ENDPOINT_PREFIX = `${EVENT_SERVICE}/api/events`;

export const deleteEvent = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${EVENT_ENDPOINT_PREFIX}/${id}/delete`);
};
