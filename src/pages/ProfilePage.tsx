import UpdateProfileForm from "@/features/auth/profile/components/UpdateProfileForm";
import { Container } from "@mui/material";

export default function ProfilePage(){
    return(
        <section>
            <Container maxWidth='xl' sx={{paddingY:6}}>
                <UpdateProfileForm />
            </Container>
        </section>
    )
}