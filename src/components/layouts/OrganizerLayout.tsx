import { ORGANIZER_MENU_ITEMS } from "@/features/organizer/constants/organizerMenuItems.constant";
import BaseLayout from "./BaseAdminLayout";
import AdminAppBar from "@/features/admin/components/AdminAppBar";

export default function OrganizerLayout() {
  return (
    <BaseLayout
      AppBarComponent={AdminAppBar}
      menuItems={ORGANIZER_MENU_ITEMS}
    />
  );
}