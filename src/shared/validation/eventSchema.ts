import * as yup from "yup";
import i18n from "@/translations";

const messages = {
    required: i18n.t("validation.required"),
    email: i18n.t("validation.email"),
    url: i18n.t("validation.url"),
    min: (min: number) => i18n.t("validation.min", { min }),
    max: (max: number) => i18n.t("validation.max", { max }),
    positive: i18n.t("validation.positive"),
    invalidDate: i18n.t("validation.invalidDate"),
    dateRange: i18n.t("validation.dateRange"),
    timeRange: i18n.t("validation.timeRange"),
};

export const basicInfoSchema = yup.object({
    name: yup.string().required(messages.required).max(150, messages.max(150)),
    description: yup
        .string()
        .required(messages.required)
        .max(2000, messages.max(2000)),
    imagePath: yup.string().nullable().notRequired(),
    cost: yup
        .number()
        .transform((v, o) => (o === "" || o === null ? undefined : v))
        .min(0, messages.min(0))
        .nullable(),
    categoryId: yup
        .number()
        .typeError(messages.required)
        .required(messages.required),
    modalityId: yup
        .number()
        .typeError(messages.required)
        .required(messages.required),
    capacity: yup
        .number()
        .transform((v, o) => (o === "" || o === null ? undefined : v))
        .positive(messages.positive)
        .nullable(),
});

export const scheduleSchema = yup
    .object({
        isRecurrent: yup.boolean().required(),
        date: yup
            .date()
            .nullable()
            .typeError(messages.invalidDate)
            .when("isRecurrent", {
                is: false,
                then: (schema) => schema.required(messages.required),
                otherwise: (schema) => schema.notRequired(),
            }),
        startDate: yup
            .date()
            .nullable()
            .typeError(messages.invalidDate)
            .when("isRecurrent", {
                is: true,
                then: (schema) => schema.required(messages.required),
                otherwise: (schema) => schema.notRequired(),
            }),
        endDate: yup
            .date()
            .nullable()
            .typeError(messages.invalidDate)
            .when("isRecurrent", {
                is: true,
                then: (schema) =>
                    schema
                        .required(messages.required)
                        .test("endDate-after-startDate", messages.dateRange, function (value) {
                            const { startDate } = this.parent;
                            if (!startDate || !value) return true;
                            return new Date(value) >= new Date(startDate);
                        }),
                otherwise: (schema) => schema.notRequired(),
            }),
        recurrenceType: yup
            .string()
            .nullable()
            .when("isRecurrent", {
                is: true,
                then: (schema) => schema.required(messages.required),
                otherwise: (schema) => schema.notRequired(),
            }),
        startTime: yup
            .string()
            .required(messages.required)
            .test("startTime-valid", messages.invalidDate, function (value) {
                if (!value) return true;
                const [h, m] = value.split(":").map(Number);
                return !isNaN(h) && !isNaN(m);
            }),
        endTime: yup
            .string()
            .required(messages.required)
            .test("endTime-after-startTime", messages.timeRange, function (value) {
                const { startTime } = this.parent;
                if (!startTime || !value) return true;
                const [sh, sm] = startTime.split(":").map(Number);
                const [eh, em] = value.split(":").map(Number);
                const startMinutes = sh * 60 + sm;
                const endMinutes = eh * 60 + em;
                return endMinutes > startMinutes;
            }),
    })
    .test("date-range-valid", messages.dateRange, function (values) {
        const { isRecurrent, startDate, endDate, date } = values as any;
        if (isRecurrent && startDate && endDate) {
            return new Date(startDate) <= new Date(endDate);
        }
        if (!isRecurrent && date) {
            return !isNaN(new Date(date).getTime());
        }
        return true;
    })
    .test("time-range-valid", messages.timeRange, function (values) {
        const { startTime, endTime } = values as any;
        if (!startTime || !endTime) return true;
        const [sh, sm] = startTime.split(":").map(Number);
        const [eh, em] = endTime.split(":").map(Number);
        const startMinutes = sh * 60 + sm;
        const endMinutes = eh * 60 + em;
        return endMinutes > startMinutes;
    });

export const spaceSchema = yup.object({
    requiresSpace: yup.boolean().nullable(),
    spaceId: yup
        .number()
        .nullable()
        .when("requiresSpace", {
            is: true,
            then: (schema) =>
                schema.typeError(messages.required).required(messages.required),
            otherwise: (schema) => schema.notRequired(),
        }),
});

export const organizerSchema = yup.object({
    organizer: yup.object({
        type: yup
            .string()
            .required(messages.required)
            .oneOf(["INTERNAL", "EXTERNAL"]),
        name: yup
            .string()
            .nullable()
            .when("type", {
                is: "EXTERNAL",
                then: (schema) => schema.required(messages.required),
            }),
        email: yup
            .string()
            .email(messages.email)
            .nullable()
            .when("type", {
                is: "EXTERNAL",
                then: (schema) => schema.required(messages.required),
            }),
        phone: yup.string().nullable(),
        internalFacultyId: yup
            .number()
            .nullable()
            .when("type", {
                is: "INTERNAL",
                then: (schema) =>
                    schema.typeError(messages.required).required(messages.required),
            }),
        internalProgramId: yup
            .number()
            .nullable()
            .when("type", {
                is: "INTERNAL",
                then: (schema) =>
                    schema.typeError(messages.required).required(messages.required),
            }),
        internalAcademicAreaId: yup
            .number()
            .nullable()
            .when("type", {
                is: "INTERNAL",
                then: (schema) =>
                    schema.typeError(messages.required).required(messages.required),
            }),
        externalOrganizationName: yup
            .string()
            .nullable()
            .when("type", {
                is: "EXTERNAL",
                then: (schema) => schema.required(messages.required),
            }),
        externalOrganizationWebsite: yup
            .string()
            .nullable()
            .when("type", {
                is: "EXTERNAL",
                then: (schema) =>
                    schema.url(messages.url).required(messages.required),
            }),
    }),
});

export const agendaSchema = yup.object({
    agenda: yup
        .array()
        .of(
            yup.object({
                title: yup.string().required(messages.required),
                description: yup.string().nullable(),
                startTime: yup.string().required(messages.required),
                endTime: yup
                    .string()
                    .required(messages.required)
                    .test("agenda-time-range", messages.timeRange, function (endTime) {
                        const { startTime } = this.parent;
                        if (!startTime || !endTime) return true;
                        const [sh, sm] = startTime.split(":").map(Number);
                        const [eh, em] = endTime.split(":").map(Number);
                        const startMinutes = sh * 60 + sm;
                        const endMinutes = eh * 60 + em;
                        return endMinutes > startMinutes;
                    }),
            })
        )
        .nullable(),
});

export const attachmentsSchema = yup.object({
    attachments: yup
        .array()
        .of(
            yup.object({
                name: yup.string().required(messages.required),
                filePath: yup.string().required(messages.required),
                contentType: yup.string().required(messages.required),
            })
        )
        .nullable(),
    extraContacts: yup
        .array()
        .of(
            yup.object({
                name: yup.string().required(messages.required),
                email: yup
                    .string()
                    .email(messages.email)
                    .required(messages.required),
                phone: yup.string().nullable(),
            })
        )
        .nullable(),
});

export const getStepSchema = (step: number) => {
    switch (step) {
        case 0:
            return basicInfoSchema;
        case 1:
            return scheduleSchema;
        case 2:
            return spaceSchema;
        case 3:
            return organizerSchema;
        case 4:
            return agendaSchema;
        case 5:
            return attachmentsSchema;
        default:
            return yup.object({});
    }
};

export const eventFormSchema = basicInfoSchema
    .concat(scheduleSchema)
    .concat(spaceSchema)
    .concat(organizerSchema)
    .concat(agendaSchema)
    .concat(attachmentsSchema);

export type EventFormData = yup.InferType<typeof eventFormSchema>;
