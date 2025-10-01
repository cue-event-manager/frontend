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
    ListItemIcon,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Logo from "../atoms/Logo";
import { useScrollPosition } from "../../shared/hooks/useScrollPosition";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const scrolled = useScrollPosition(10);

    const onClose = () => setOpen(false);

    return (
        <>
            <AppBar
                position="fixed" 
                elevation={scrolled ? 2 : 0}
                sx={{
                    backgroundColor: scrolled ? "background.paper" : "transparent",
                    color: scrolled ? "text.primary" : "common.white",
                    transition: "all 0.3s ease",
                }}
            >
                <Toolbar disableGutters>
                    <Container
                        maxWidth="xl"
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: 1,
                        }}
                    >
                        <Logo />

                        {/* Desktop */}
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <Button
                                variant={scrolled ? "outlined" : "contained"}
                                color="primary"
                            >
                                Iniciar sesión
                            </Button>
                        </Box>

                        {/* Mobile */}
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton onClick={() => setOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>

            {/* Drawer mobile */}
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
                            minHeight: "50%",
                        },
                    },
                }}
            >
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

                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={onClose}
                            sx={{
                                borderRadius: 2,
                                px: 2,
                                py: 1.5,
                                "&:hover": { backgroundColor: "action.hover" },
                            }}
                        >
                            <ListItemIcon>
                                <LoginIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Iniciar sesión"
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}
