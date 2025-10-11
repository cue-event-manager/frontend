import * as yup from "yup";
import i18n from "@/translations";

export const createUserSchema = yup.object({
    firstName: yup
        .string()
        .required(i18n.t("validation.required"))
        .min(2, i18n.t("validation.minLength", { count: 2 })),
    lastName: yup
        .string()
        .required(i18n.t("validation.required"))
        .min(2, i18n.t("validation.minLength", { count: 2 })),
    email: yup
        .string()
        .required(i18n.t("validation.required"))
        .email(i18n.t("validation.email")),
    password: yup
        .string()
        .required(i18n.t("validation.required"))
        .min(6, i18n.t("validation.minPassword", { count: 6 })),
    roleId: yup.string().required(i18n.t("validation.required")),
    identification: yup.string().nullable(),
    birthDate: yup
        .date()
        .typeError(i18n.t("validation.invalidDate"))
        .required(i18n.t("validation.required")),
});

export const updateUserSchema = yup.object({
    firstName: yup
        .string()
        .required(i18n.t("validation.required"))
        .min(2, i18n.t("validation.minLength", { count: 2 })),
    lastName: yup
        .string()
        .required(i18n.t("validation.required"))
        .min(2, i18n.t("validation.minLength", { count: 2 })),
    email: yup
        .string()
        .required(i18n.t("validation.required"))
        .email(i18n.t("validation.email")),
    password: yup.string().notRequired(),
    roleId: yup.string().required(i18n.t("validation.required")),
    identification: yup.string().nullable(),
    birthDate: yup
        .date()
        .typeError(i18n.t("validation.invalidDate"))
        .required(i18n.t("validation.required")),
});
