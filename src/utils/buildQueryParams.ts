export function buildQueryParams<T extends object>(query?: T): string {
  if(!query) return "";

  const cleanedEntries = Object.entries(query)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      if (value instanceof Date) {
        return [key, value.toISOString().split("T")[0]];
      }
      return [key, String(value)];
    });

    console.log(cleanedEntries);

  return new URLSearchParams(cleanedEntries).toString();
}
