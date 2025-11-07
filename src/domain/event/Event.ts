import type { EventAgendaItem } from "./EventAgendaItem";
import type { EventAttachment } from "./EventAttachment";
import type { EventExtraContact } from "./EventExtraContact";
import type { EventOrganizer } from "./EventOrganizer";
import type { EventRecurrenceMode } from "./enums/EventRecurrenceMode";
import type { EventStatus } from "./enums/EventStatus";
import type { RecurrenceType } from "./enums/RecurrenceType";

export interface Event {
    id: number;
    name: string;
    description: string;
    cost: number;
    imagePath: string;
    date: string;
    startTime: string;
    endTime: string;
    spaceId: number;
    virtualMeetingLink?: string;
    capacity: number;
    status: EventStatus;
    recurrenceMode: EventRecurrenceMode;
    recurrenceId?: string;
    parentId?: number;
    recurrenceType?: RecurrenceType;
    categoryId: number;
    categoryName: string;
    modalityId: number;
    modalityName: string;
    organizer: EventOrganizer;
    agenda: EventAgendaItem[];
    attachments: EventAttachment[];
    extraContacts: EventExtraContact[];
    createdBy: number;
    createdAt: string;
}
