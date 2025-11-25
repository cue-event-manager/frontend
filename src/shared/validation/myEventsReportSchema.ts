import * as yup from "yup";
import i18n from "@/translations";

export const myEventsReportSchema = yup.object({
    startDate: yup
        .string()
        .required(i18n.t("validation.required")),
    endDate: yup
        .string()
        .required(i18n.t("validation.required"))
        .test(
            "is-after-start",
            i18n.t("validation.endDateAfterStart"),
            function (value) {
                const { startDate } = this.parent;
                if (!startDate || !value) return true;
                return new Date(value) >= new Date(startDate);
            }
        ),
    status: yup.string().optional(),
    format: yup
        .string()
        .required(i18n.t("validation.required")),
});
