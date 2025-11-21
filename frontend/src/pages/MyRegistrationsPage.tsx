import { Container, Typography, Box } from "@mui/material";
import MyRegistrationsCard from "@/features/eventregistration/components/MyRegistrationsCard";

export default function MyRegistrationsPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box mb={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Mis Inscripciones
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Administra tus inscripciones a eventos
                </Typography>
            </Box>

            <MyRegistrationsCard />
        </Container>
    );
}
