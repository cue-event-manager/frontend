import type { UpdateProfileRequestDto } from "@/domain/profile/UpdateProfileRequestDto";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: UpdateProfileRequestDto) => null,
    onSuccess: () => toast.success("Perfil actualizado correctamente."),
    onError: () => toast.error("Error al actualizar el perfil."),
  });
}
