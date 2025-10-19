import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useCreateAcademicProgram } from "../hooks/useCreateAcademicProgram";
import { useUpdateAcademicProgram } from "../hooks/useUpdateAcademicProgram";
import type { AcademicProgram } from "@/domain/academicprogram/AcademicProgram";
import type { CreateAcademicProgramRequestDto } from "@/domain/academicprogram/CreateAcademicProgramRequestDto";
import type { UpdateAcademicProgramRequestDto } from "@/domain/academicprogram/UpdateAcademicProgramRequestDto";
import { academicProgramSchema } from "@/shared/validation/academicProgramSchema";
import { useAllFaculties } from "@/features/faculty/hooks/useAllFaculties";
import { SearchSelect } from "@/components/molecules/SearchSelect";

interface AcademicProgramFormProps {
    initialData?: AcademicProgram | null;
    onSuccess?: () => void;
}

export default function AcademicProgramForm({ initialData, onSuccess }: AcademicProgramFormProps) {
    const { t } = useTranslation();
    const isEditMode = Boolean(initialData);

    const createMutation = useCreateAcademicProgram();
    const updateMutation = useUpdateAcademicProgram();

    const faculties = useAllFaculties();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<CreateAcademicProgramRequestDto | UpdateAcademicProgramRequestDto>({
        resolver: yupResolver(academicProgramSchema) as any,
        defaultValues: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
            facultyId: initialData?.faculty.id ?? undefined
        },
    });

    const onSubmit = (data: CreateAcademicProgramRequestDto | UpdateAcademicProgramRequestDto) => {
        if (isEditMode && initialData) {
            updateMutation.mutate(
                { ...data, id: initialData.id },
                { onSuccess }
            );
        } else {
            createMutation.mutate(data as CreateAcademicProgramRequestDto, { onSuccess });
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
                label={t("admin.academicPrograms.fields.name")}
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message ?? " "}
            />

            <TextField
                fullWidth
                label={t("admin.academicPrograms.fields.description")}
                margin="normal"
                multiline
                rows={3}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message ?? " "}
            />

            <SearchSelect
                name="facultyId"
                label={t("admin.spaces.fields.campus")}
                control={control}
                options={
                    faculties.data?.map((c) => ({ label: c.name, value: c.id })) ?? []
                }
                loading={faculties.isLoading}
                required
                margin="none"
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
