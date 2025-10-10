import AdminAppBar from "@/features/admin/components/AdminAppBar";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminAppBar drawerWidth={drawerWidth} onMenuClick={handleDrawerToggle} />
      <AdminSidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p:2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
