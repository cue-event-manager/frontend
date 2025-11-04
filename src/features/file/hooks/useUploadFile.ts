import { useMutation } from "@tanstack/react-query";
import type { File } from "@/domain/file/File";
import { uploadFile } from "@/services/file.service";
import type { UploadFileRequestDto } from "@/domain/file/UploadFileRequestDto";

export function useUploadFile() {
    return useMutation<File, Error, UploadFileRequestDto>({
        mutationFn: uploadFile,
    });
}
