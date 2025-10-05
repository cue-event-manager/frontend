import { useAuth } from "@/contexts/authContext";
import { logout } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";


export const useLogout = () => {
    const { logout: userContextLogout } = useAuth();

    return useMutation<void, unknown, void>({
        mutationFn: logout,
        onSuccess: () => {
            userContextLogout();
        }
    });
};
