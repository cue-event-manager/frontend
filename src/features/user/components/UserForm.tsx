import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Divider,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@/shared/hooks/useAppForm";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import type { CreateUserRequestDto } from "@/domain/user/CreateUserRequestDto";
import type { UpdateUserRequestDto } from "@/domain/user/UpdateUserRequestDto";
import { useCreateUser } from "../hooks/useCreateUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import {
    createUserSchema,
    updateUserSchema,
} from "../schemas/userFormSchema";
import type { User } from "@/domain/user/User";

interface UserFormProps {
    initialData?: User;
    onSuccess?: () => void;
}

type UserFormFields = Omit<CreateUserRequestDto, "password"> & {
    password?: string;
};

const ROLES = [
    { value: "1", label: "Administrador" },
    { value: "2", label: "Organizador" },
    { value: "3", label: "Asistente" },
];

const generatePassword = (): string => {
    const length = 12;
    const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
};

export function UserForm({ initialData, onSuccess }: UserFormProps) {
    const { t } = useTranslation();
    const isEditing = !!initialData;
    const [showPassword, setShowPassword] = useState(false);

    const createMutation = useCreateUser();
    const updateMutation = useUpdateUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useAppForm<UserFormFields>({
        resolver: yupResolver(
            isEditing ? updateUserSchema as any : createUserSchema as any
        ),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            roleId: "",
            identification: "",
            birthDate: undefined,
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                firstName: initialData.firstName ?? "",
                lastName: initialData.lastName ?? "",
                email: initialData.email ?? "",
                roleId: String(initialData.role?.id ?? ""),
                identification: initialData.identification ?? "",
                birthDate: initialData.birthDate ?? undefined,
            });
        }
    }, [initialData, reset]);

    const handleGeneratePassword = () => {
        const newPassword = generatePassword();
        setValue("password", newPassword, { shouldValidate: true });
    };

    const onSubmit = (values: UserFormFields) => {
        if (isEditing && initialData?.id) {
            const { password, ...updateData } = values;
            updateMutation.mutate(
                { ...updateData, id: initialData.id } as UpdateUserRequestDto,
                { onSuccess }
            );
        } else {
            createMutation.mutate(values as CreateUserRequestDto, { onSuccess });
        }
    };

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("users.form.sections.personalInfo")}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label={t("users.form.firstName")}
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message ?? " "}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label={t("users.form.lastName")}
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message ?? " "}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label={t("users.form.identification")}
                        {...register("identification")}
                        error={!!errors.identification}
                        helperText={errors.identification?.message ?? " "}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        type="date"
                        label={t("users.form.birthDate")}
                        InputLabelProps={{ shrink: true }}
                        {...register("birthDate")}
                        error={!!errors.birthDate}
                        helperText={errors.birthDate?.message ?? " "}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("users.form.sections.accountInfo")}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        type="email"
                        label={t("users.form.email")}
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message ?? " "}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        select
                        label={t("users.form.role")}
                        {...register("roleId")}
                        error={!!errors.roleId}
                        helperText={errors.roleId?.message ?? " "}
                    >
                        <MenuItem value="">
                            {t("common.actions.select")}
                        </MenuItem>
                        {ROLES.map((role) => (
                            <MenuItem key={role.value} value={role.value}>
                                {role.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {!isEditing && (
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            label={t("users.form.password")}
                            {...register("password")}
                            value={watch("password") || ""}
                            error={!!errors.password}
                            helperText={errors.password?.message ?? " "}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            aria-label={t("users.form.togglePassword")}
                                        >
                                            {showPassword ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </IconButton>
                                        <IconButton
                                            onClick={handleGeneratePassword}
                                            edge="end"
                                            aria-label={t("users.form.generatePassword")}
                                            sx={{ ml: 1 }}
                                        >
                                            <AutorenewIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                )}
            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                >
                    {isEditing
                        ? t("common.actions.update")
                        : t("common.actions.create")}
                </Button>
            </Box>
        </Box>
    );
}