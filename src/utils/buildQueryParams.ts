export function buildQueryParams<T extends object>(query: T): string {
  const cleanedEntries = Object.entries(query)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      if (value instanceof Date) {
        return [key, value.toISOString().split("T")[0]];
      }
      return [key, String(value)];
    });

  return new URLSearchParams(cleanedEntries).toString();
}
