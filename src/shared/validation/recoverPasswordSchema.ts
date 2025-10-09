import * as yup from "yup";
import i18n from "../../translations";

export const recoverPasswordSchema = yup.object({
    email: yup
        .string()
        .required(i18n.t("validation.required"))
        .email(i18n.t("validation.email")),
});
