import { useMutation } from "@tanstack/react-query";
import { generateMyEventsReport } from "@/services/report.service";
import type { GenerateMyEventsReportRequestDto } from "@/domain/report/GenerateMyEventsReportRequestDto";

export function useGenerateMyEventsReport() {
    return useMutation({
        mutationFn: (request: GenerateMyEventsReportRequestDto) =>
            generateMyEventsReport(request),
    });
}
