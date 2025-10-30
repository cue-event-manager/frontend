import AdminAppBar from "@/features/admin/components/AdminAppBar";
import { ADMIN_MENU_ITEMS } from "@/features/admin/constants/adminMenuItems.constant";
import BaseLayout from "./BaseAdminLayout";

export default function AdminLayout() {
  return (
    <BaseLayout
      AppBarComponent={AdminAppBar}
      menuItems={ADMIN_MENU_ITEMS}
    />
  );
}
