import axiosInstance from "@/config/axiosConfig";
import type { GenerateMyEventsReportRequestDto } from "@/domain/report/GenerateMyEventsReportRequestDto";
import { ReportFormat } from "@/domain/report/enums/ReportFormat";
import { EVENT_SERVICE } from "./constants";

const REPORT_ENDPOINT = `${EVENT_SERVICE}/api/events/reports`;

export const generateMyEventsReport = async (
    request: GenerateMyEventsReportRequestDto
): Promise<void> => {
    const { data } = await axiosInstance.post<Blob>(
        `${REPORT_ENDPOINT}/my-events`,
        request,
        {
            responseType: "blob",
        }
    );

    downloadFile(data, request.format, "mis_eventos");
};

export const generateEventRegistrationsReport = async (
    eventId: number,
    format: ReportFormat
): Promise<void> => {
    const { data } = await axiosInstance.get<Blob>(
        `${REPORT_ENDPOINT}/registrations/${eventId}`,
        {
            params: { format },
            responseType: "blob",
        }
    );

    downloadFile(data, format, `inscripciones_evento_${eventId}`);
};

const downloadFile = (blob: Blob, format: ReportFormat, baseFilename: string) => {
    const extension = format === ReportFormat.EXCEL ? ".xlsx" : ".pdf";
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
    const filename = `${baseFilename}_${timestamp}${extension}`;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};
