import * as yup from "yup";
import i18n from "../../translations";

export const loginSchema = yup.object({
    email: yup
        .string()
        .required(i18n.t("validation.required"))
        .email(i18n.t("validation.email")),
    password: yup
        .string()
        .required(i18n.t("validation.required"))
        .min(6, i18n.t("validation.minPassword", { count: 6 })),
});
