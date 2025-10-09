import { Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface OtpInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    helperText?: string;
}

export default function OtpInput({
    length = 6,
    value,
    onChange,
    error,
    helperText,
}: OtpInputProps) {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const [internalValue, setInternalValue] = useState<string[]>(() =>
        Array(length).fill("")
    );

    useEffect(() => {
        if (value && value.length === length) {
            setInternalValue(value.split(""));
        }
    }, [value, length]);

    const handleChange = (index: number, digit: string) => {
        const newValue = [...internalValue];
        newValue[index] = digit.slice(-1);
        setInternalValue(newValue);

        const joined = newValue.join("");
        onChange(joined);

        if (digit && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !internalValue[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            gap={1.2}
            my={2}
            position="relative"
        >
            {Array.from({ length }).map((_, index) => (
                <TextField
                    key={index}
                    type="text"
                    inputRef={(el) => (inputsRef.current[index] = el)}
                    value={internalValue[index]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(index, e.target.value.replace(/\D/g, ""))
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(index, e)
                    }
                    inputProps={{
                        maxLength: 1,
                        inputMode: "numeric",
                        style: {
                            textAlign: "center",
                            fontSize: "1.25rem",
                            width: "2.5rem",
                            padding: "10px 0",
                        },
                    }}
                    error={error}
                    variant="outlined"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                        },
                        "& input": {
                            textAlign: "center",
                        },
                    }}
                />
            ))}

            {helperText && (
                <Box
                    position="absolute"
                    bottom={-22}
                    width="100%"
                    textAlign="center"
                    fontSize="0.75rem"
                    color={error ? "error.main" : "text.secondary"}
                >
                    {helperText}
                </Box>
            )}
        </Box>
    );
}
