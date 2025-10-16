import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useCreateAcademicArea } from "../hooks/useCreateAcademicArea";
import { useUpdateAcademicArea } from "../hooks/useUpdateAcademicArea";
import { academicAreaSchema } from "@/shared/validation/academicAreaSchema";
import type { AcademicArea } from "@/domain/academicarea/AcademicArea";
import type { CreateAcademicAreaRequestDto } from "@/domain/academicarea/CreateAcademicAreaRequestDto";
import type { UpdateAcademicAreaRequestDto } from "@/domain/academicarea/UpdateAcademicAreaRequestDto";

interface AcademicAreaFormProps {
    initialData?: AcademicArea | null;
    onSuccess?: () => void;
}

export default function AcademicAreaForm({ initialData, onSuccess }: AcademicAreaFormProps) {
    const { t } = useTranslation();

    const isEditMode = Boolean(initialData);
    const createMutation = useCreateAcademicArea();
    const updateMutation = useUpdateAcademicArea();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<CreateAcademicAreaRequestDto | UpdateAcademicAreaRequestDto>({
        resolver: yupResolver(academicAreaSchema) as any,
        defaultValues: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
        },
    });

    const onSubmit = (data: CreateAcademicAreaRequestDto | UpdateAcademicAreaRequestDto) => {
        if (isEditMode && initialData) {
            updateMutation.mutate(
                { ...data, id: initialData.id },
                { onSuccess }
            );
        } else {
            createMutation.mutate(data as CreateAcademicAreaRequestDto, { onSuccess });
        }
    };

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ width: "100%" }}
        >
            <TextField
                fullWidth
                label={t("admin.academicAreas.fields.name")}
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message ?? " "}
            />

            <TextField
                fullWidth
                label={t("admin.academicAreas.fields.description")}
                margin="normal"
                multiline
                rows={3}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message ?? " "}
            />

            <Button
                type="submit"
                variant="contained"
                loading={isLoading}
                fullWidth
                sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
                {isEditMode
                    ? t("common.actions.update")
                    : t("common.actions.create")}
            </Button>
        </Box>
    );
}
