import * as yup from "yup";
import i18n from "@/translations";

export const updateProfileSchema = yup.object({
    firstName: yup
        .string()
        .required(i18n.t("validation.required")),
    lastName: yup
        .string()
        .required(i18n.t("validation.required")),
    email: yup
        .string()
        .email(i18n.t("validation.email"))
        .required(i18n.t("validation.required")),
    phoneNumber: yup
        .string()
        .optional()
        .matches(/^[0-9+\-\s()]*$/, i18n.t("validation.phoneFormat"))
        .max(20, i18n.t("validation.phoneMax")),
    currentPassword: yup
        .string()
        .optional(),
    newPassword: yup
        .string()
        .optional()
        .when("currentPassword", {
            is: (val: string | null | undefined) => !!val,
            then: (schema) =>
                schema.min(6, i18n.t("validation.minPassword", { count: 6 })),
        }),
});

export type UpdateProfileFormValues = yup.InferType<typeof updateProfileSchema>;
