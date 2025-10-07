import UpdateProfileForm from "@/features/auth/profile/components/UpdateProfileForm";
import useNavbarHeight from "@/shared/hooks/useNavbarHeight";
import { Container } from "@mui/material";

export default function ProfilePage() {
    const navbarHeight = useNavbarHeight();

    return (
        <section>
            <Container maxWidth='xl' sx={{ paddingY: 6, minHeight: `calc(100vh - ${navbarHeight}px)` }}>
                <UpdateProfileForm />
            </Container>
        </section >
    )
}