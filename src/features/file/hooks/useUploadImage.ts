import { useMutation } from "@tanstack/react-query";
import type { File } from "@/domain/file/File";
import type { UploadImageRequestDto } from "@/domain/file/UploadImageRequestDto";
import { uploadImage } from "@/services/file.service"; 

export function useUploadImage() {
  return useMutation<File, Error, UploadImageRequestDto>({
    mutationFn: uploadImage,
  });
}
