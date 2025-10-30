import { useQuery } from "@tanstack/react-query";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import type { EventCategory } from "@/domain/eventcategory/EventCategory";
import type { EventCategoryPaginationRequestDto } from "@/domain/eventcategory/EventCategoryPaginationRequestDto";
import { EVENT_CATEGORY_QUERY_KEYS } from "../constants/eventCategoryQueries.constant";
import { getEventCategories } from "@/services/eventCategory.service";

export function useEventCategories(query: PaginationQuery & EventCategoryPaginationRequestDto) {
    return useQuery<Page<EventCategory>, Error>({
        queryKey: [EVENT_CATEGORY_QUERY_KEYS.EVENT_CATEGORIES.ROOT, query],
        queryFn: () => getEventCategories(query),
    });
}
