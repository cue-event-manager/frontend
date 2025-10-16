import {
    Autocomplete,
    TextField,
    CircularProgress,
    type SxProps,
    type Theme,
} from "@mui/material";
import {
    Controller,
    type Control,
    type FieldError,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface Option {
    label: string;
    value: string | number;
}

interface CommonProps {
    label: string;
    options: Option[];
    multiple?: boolean;
    loading?: boolean;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    helperText?: string;
    margin?: "none" | "dense" | "normal";
    size?: "small" | "medium";
    reserveHelperTextSpace?: boolean;
    sx?: SxProps<Theme>;
}

interface FormControlledProps extends CommonProps {
    name: string;
    control: Control<any>;
    value?: never;
    onChange?: never;
}

interface StandaloneProps extends CommonProps {
    name?: string;
    control?: never;
    value: string | number | (string | number)[] | null;
    onChange: (value: string | number | (string | number)[] | null) => void;
}

type SearchSelectProps = FormControlledProps | StandaloneProps;

export function SearchSelect(props: SearchSelectProps) {
    const {
        label,
        options,
        multiple = false,
        loading = false,
        disabled = false,
        placeholder,
        margin = "none",
        size = "small",
        sx,
    } = props;

    const { t } = useTranslation();

    if ("control" in props && props.control) {
        const { name, control } = props;

        return (
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => {
                    const error: FieldError | undefined = fieldState?.error;

                    const currentValue = multiple
                        ? options.filter((opt) =>
                            Array.isArray(field.value)
                                ? field.value.includes(opt.value)
                                : false
                        )
                        : options.find((opt) => opt.value === field.value) ?? null;

                    return (
                        <Autocomplete
                            sx={sx}
                            noOptionsText={t("common.noOptions")}
                            multiple={multiple}
                            options={options}
                            getOptionLabel={(opt) => opt.label ?? ""}
                            value={currentValue}
                            onChange={(_, newValue) => {
                                if (multiple) {
                                    field.onChange(
                                        (newValue as Option[]).map((v) => v.value)
                                    );
                                } else {
                                    field.onChange(
                                        (newValue as Option | null)?.value ?? null
                                    );
                                }
                            }}
                            onBlur={field.onBlur}
                            loading={loading}
                            disabled={disabled}
                            size={size}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={label}
                                    placeholder={placeholder}
                                    error={!!error}
                                    margin={margin}
                                    size={size}
                                    onBlur={field.onBlur}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {loading ? <CircularProgress size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />
                    );
                }}
            />
        );
    }

    const { value, onChange } = props;

    const currentValue = multiple
        ? options.filter((opt) =>
            Array.isArray(value) ? value.includes(opt.value) : false
        )
        : options.find((opt) => opt.value === value) ?? null;

    return (
        <Autocomplete
            sx={sx}
            noOptionsText={t("common.noOptions")}
            multiple={multiple}
            options={options}
            getOptionLabel={(opt) => opt.label ?? ""}
            value={currentValue}
            onChange={(_, newValue) => {
                if (multiple) {
                    onChange((newValue as Option[]).map((v) => v.value));
                } else {
                    onChange((newValue as Option | null)?.value ?? null);
                }
            }}
            loading={loading}
            disabled={disabled}
            size={size}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    margin={margin}
                    size={size}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}