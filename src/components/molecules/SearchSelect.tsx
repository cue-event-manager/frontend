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
    value?: string | number | (string | number)[] | null;
    onChange?: (value: string | number | (string | number)[] | null) => void;
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
        reserveHelperTextSpace = true,
        sx,
    } = props;

    const { t } = useTranslation();

    if ("control" in props && props.control) {
        const { name, control, onChange: externalOnChange, value: externalValue } =
            props;

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
                        : options.find(
                            (opt) =>
                                opt.value === (externalValue ?? field.value)
                        ) ?? null;

                    const handleChange = (
                        _: any,
                        newValue: Option | Option[] | null
                    ) => {
                        let newVal: string | number | (string | number)[] | null = null;

                        if (multiple) {
                            newVal = (newValue as Option[]).map((v) => v.value);
                        } else {
                            newVal = (newValue as Option | null)?.value ?? null;
                        }

                        field.onChange(newVal);
                        if (externalOnChange) externalOnChange(newVal);
                    };

                    const helperTextValue = error?.message ?? "";

                    return (
                        <Autocomplete
                            sx={sx}
                            noOptionsText={t("common.noOptions")}
                            multiple={multiple}
                            options={options}
                            getOptionLabel={(opt) => opt.label ?? ""}
                            value={currentValue}
                            onChange={handleChange}
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
                                    helperText={
                                        reserveHelperTextSpace
                                            ? helperTextValue || " "
                                            : helperTextValue || undefined
                                    }
                                    margin={margin}
                                    size={size}
                                    onBlur={field.onBlur}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {loading ? (
                                                    <CircularProgress size={20} />
                                                ) : null}
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

    const { value, onChange, helperText } = props;

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
                    helperText={
                        reserveHelperTextSpace
                            ? helperText || " "
                            : helperText || undefined
                    }
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
