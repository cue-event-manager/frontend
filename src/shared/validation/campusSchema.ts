import * as yup from "yup";
import i18n from "@/translations";

export const campusSchema = yup.object({
    name: yup
        .string()
        .required(i18n.t("validation.required"))
        .max(100, i18n.t("validation.max", { max: 100 })),
    address: yup
        .string()
        .required(i18n.t("validation.required"))
        .max(255, i18n.t("validation.max", { max: 255 })),
});
