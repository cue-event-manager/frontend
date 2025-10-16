import * as yup from "yup";
import i18n from "@/translations";

export const spaceSchema = yup.object({
    name: yup
        .string()
        .required(i18n.t("validation.required"))
        .max(100, i18n.t("validation.max", { max: 100 })),

    campusId: yup
        .number()
        .typeError(i18n.t("validation.required"))
        .required(i18n.t("validation.required")),

    typeId: yup
        .number()
        .typeError(i18n.t("validation.required"))
        .required(i18n.t("validation.required")),

    statusId: yup
        .number()
        .typeError(i18n.t("validation.required"))
        .required(i18n.t("validation.required")),

    capacity: yup
        .number()
        .typeError(i18n.t("validation.required"))
        .required(i18n.t("validation.required")),
    resourceIds: yup
        .array()
        .of(yup.number())
        .nullable()
        .default([])
        .max(50, i18n.t("validation.maxItems", { max: 50 })),
});
