import type { RecurrenceType } from "./enums/RecurrenceType";
import type { EventAgendaItem } from "./EventAgendaItem";
import type { EventAttachment } from "./EventAttachment";
import type { EventExtraContact } from "./EventExtraContact";
import type { EventOrganizer } from "./EventOrganizer";

export interface CreateRecurrentEventRequestDto {
    name: string;
    description: string;
    imagePath?: string;
    cost: number;
    categoryId: number;
    modalityId: number;
    spaceId: number;
    capacity: number;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    organizer: EventOrganizer;
    recurrenceType: RecurrenceType;

    agenda?: EventAgendaItem[];
    attachments?: EventAttachment[];
    extraContacts?: EventExtraContact[];
}