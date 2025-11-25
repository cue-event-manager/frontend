import { useMutation } from "@tanstack/react-query";
import { generateEventRegistrationsReport } from "@/services/report.service";
import { ReportFormat } from "@/domain/report/enums/ReportFormat";

interface GenerateEventRegistrationsReportParams {
    eventId: number;
    format: ReportFormat;
}

export function useGenerateEventRegistrationsReport() {
    return useMutation({
        mutationFn: ({ eventId, format }: GenerateEventRegistrationsReportParams) =>
            generateEventRegistrationsReport(eventId, format),
    });
}
