import { useQuery } from "@tanstack/react-query";
import { EVENT_CATEGORY_QUERY_KEYS } from "../constants/eventCategoryQueries.constant";
import { getAllEventCategories } from "@/services/eventCategory.service";
import type { EventCategory } from "@/domain/eventcategory/EventCategory";

export function useAllEventCategories() {
    return useQuery<EventCategory[], Error>({
        queryKey: [EVENT_CATEGORY_QUERY_KEYS.EVENT_CATEGORIES.ALL],
        queryFn: () => getAllEventCategories(),
    });
}
