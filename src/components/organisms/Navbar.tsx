import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Container,
    Divider,
    ListItemIcon,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Logo from "../atoms/Logo";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    }

    return (
        <>
            <AppBar
                position="sticky"
                color="inherit"
                elevation={0}
                sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Toolbar disableGutters>
                    <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingY: "0.5rem" }}>
                        <Logo />

                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <Button variant="outlined" color="primary">
                                Iniciar sesión
                            </Button>
                        </Box>

                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton onClick={() => setOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="bottom"
                open={open}
                onClose={onClose}
                slotProps={{
                    paper: {
                        sx: {
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            p: 2,
                            minHeight: "50%", // más compacto
                        },
                    },
                }}
            >
                {/* Header */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Logo />
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Items */}
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={onClose}
                            sx={{
                                borderRadius: 2,
                                px: 2,
                                py: 1.5,
                                "&:hover": {
                                    backgroundColor: "action.hover",
                                },
                            }}
                        >
                            <ListItemIcon>
                                <LoginIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Iniciar sesión"
                                primaryTypographyProps={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>

                    <Divider sx={{ my: 1 }} />

                    {/* Puedes agregar más opciones aquí */}
                    {/* <ListItem disablePadding>
          <ListItemButton> ... </ListItemButton>
        </ListItem> */}
                </List>
            </Drawer>
        </>
    );
}
