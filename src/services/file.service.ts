import type { File } from "@/domain/file/File";
import { FILE_SERVICE } from "./constants";
import type { UploadImageRequestDto } from "@/domain/file/UploadImageRequestDto";
import axiosInstance from "@/config/axiosConfig";

const FILE_ENDPOINT_PREFIX = `${FILE_SERVICE}/api/files`;

export const uploadImage = async (
    uploadImageRequest: UploadImageRequestDto
): Promise<File> => {
    const formData = new FormData();
    formData.append("file", uploadImageRequest.file);

    const { data } = await axiosInstance.post<File>(
        `${FILE_ENDPOINT_PREFIX}/upload-image`,
        formData,
        {
            transformRequest: (data) => data,
            headers: {
                "Content-Type": undefined,
            },
        }
    );

    return data;
};
