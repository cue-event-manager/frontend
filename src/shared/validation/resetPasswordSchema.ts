import * as yup from "yup";
import i18n from "../../translations";
import { PASSWORD_REGEX, RESET_PASSWORD_CODE_LENGTH } from "@/features/auth/constants/authConstraints.constant";



export const resetPasswordSchema = yup.object({
    code: yup
        .string()
        .required(i18n.t("validation.required"))
        .length(RESET_PASSWORD_CODE_LENGTH, i18n.t("validation.codeLength")),

    newPassword: yup
        .string()
        .required(i18n.t("validation.required"))
        .matches(
            PASSWORD_REGEX,
            i18n.t("validation.passwordSecure")
        ),
});
