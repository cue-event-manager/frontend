import { EventStatus } from "../event/enums/EventStatus";
import { ReportFormat } from "./enums/ReportFormat";

export interface GenerateMyEventsReportRequestDto {
    startDate: string;
    endDate: string;
    status?: EventStatus;
    format: ReportFormat;
}
