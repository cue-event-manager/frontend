import type { EventAgendaItem } from "./EventAgendaItem";
import type { EventAttachment } from "./EventAttachment";
import type { EventExtraContact } from "./EventExtraContact";
import type { EventOrganizer } from "./EventOrganizer";
import type { EventStatus } from "./enums/EventStatus";

export interface UpdateEventRequestDto {
    id: number;
    name?: string;
    description?: string;
    cost?: number;
    categoryId?: number;
    modalityId?: number;
    spaceId?: number;
    capacity?: number;
    imagePath?: string;
    status?: EventStatus;

    date?: string;
    startTime?: string;
    endTime?: string;

    organizer?: EventOrganizer;
    agenda?: EventAgendaItem[];
    attachments?: EventAttachment[];
    extraContacts?: EventExtraContact[];

    reactivate?: boolean;
}
