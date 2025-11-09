import axiosInstance from "@/config/axiosConfig";
import { EVENT_SERVICE } from "./constants";

const EVENT_REGISTRATION_ENDPOINT_PREFIX = `${EVENT_SERVICE}/api/event-registrations`;

export const cancelEventRegistration = async (registrationId: number): Promise<void> => {
    await axiosInstance.delete(`${EVENT_REGISTRATION_ENDPOINT_PREFIX}/${registrationId}`);
};
