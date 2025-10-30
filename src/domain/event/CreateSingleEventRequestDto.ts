import type { EventAgendaItem } from "./EventAgendaItem";
import type { EventAttachment } from "./EventAttachment";
import type { EventExtraContact } from "./EventExtraContact";
import type { EventOrganizer } from "./EventOrganizer";

export interface CreateSingleEventRequestDto {
    name: string;
    description: string;
    cost: number;
    categoryId: number;
    modalityId: number;
    spaceId: number;
    capacity: number;
    date: Date;
    startTime: string;
    endTime: string;
    organizer: EventOrganizer;

    agenda?: EventAgendaItem[];
    attachments?: EventAttachment[];
    extraContacts?: EventExtraContact[];
}