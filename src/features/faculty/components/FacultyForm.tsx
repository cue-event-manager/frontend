import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useCreateFaculty } from "../hooks/useCreateFaculty";
import { useUpdateFaculty } from "../hooks/useUpdateFaculty";
import type { Faculty } from "@/domain/faculty/Faculty";
import type { CreateFacultyRequestDto } from "@/domain/faculty/CreateFacultyRequestDto";
import type { UpdateFacultyRequestDto } from "@/domain/faculty/UpdateFacultyRequestDto";
import { facultySchema } from "@/shared/validation/facultySchema";

interface FacultyFormProps {
    initialData?: Faculty | null;
    onSuccess?: () => void;
}

export default function FacultyForm({ initialData, onSuccess }: FacultyFormProps) {
    const { t } = useTranslation();

    const isEditMode = Boolean(initialData);
    const createMutation = useCreateFaculty();
    const updateMutation = useUpdateFaculty();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<CreateFacultyRequestDto | UpdateFacultyRequestDto>({
        resolver: yupResolver(facultySchema) as any,
        defaultValues: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
        },
    });

    const onSubmit = (data: CreateFacultyRequestDto | UpdateFacultyRequestDto) => {
        if (isEditMode && initialData) {
            updateMutation.mutate(
                { ...data, id: initialData.id },
                { onSuccess }
            );
        } else {
            createMutation.mutate(data as CreateFacultyRequestDto, { onSuccess });
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
                label={t("admin.faculties.fields.name")}
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message ?? " "}
            />

            <TextField
                fullWidth
                label={t("admin.faculties.fields.description")}
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
