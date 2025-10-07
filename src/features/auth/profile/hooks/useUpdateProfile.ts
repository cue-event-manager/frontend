import type { UpdateProfileRequestDto } from "@/domain/profile/UpdateProfileRequestDto";
import { updateProfile } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function useUpdateProfile() {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (data: UpdateProfileRequestDto) => updateProfile(data),
    onSuccess: () => toast.success(t("profile.messages.success")),
  });
}
