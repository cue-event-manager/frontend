import { useState } from "react";

export function useFilterForm<T extends Record<string, any>>(initialValues: T) {
    const [filters, setFilters] = useState<T>(initialValues);

    const handleChange = (field: keyof T, value: any) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const resetFilters = () => setFilters(initialValues);

    const applyFilters = (callback: (filters: T) => void) => {
        callback(filters);
    };

    return { filters, handleChange, resetFilters, applyFilters, setFilters };
}
