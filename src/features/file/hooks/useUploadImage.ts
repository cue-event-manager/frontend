import { useMutation } from "@tanstack/react-query";
import type { File } from "@/domain/file/File";
import { uploadImage } from "@/services/file.service"; 
import type { UploadImageRequestDto } from "@/domain/file/UploadImageRequestDto";

export function useUploadImage() {
  return useMutation<File, Error, UploadImageRequestDto>({
    mutationFn: uploadImage,
  });
}
