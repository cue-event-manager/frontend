import type { File } from "@/domain/file/File";
import { FILE_SERVICE } from "./constants";
import type { UploadImageRequestDto } from "@/domain/file/UploadImageRequestDto";
import type { UploadFileRequestDto } from "@/domain/file/UploadFileRequestDto";
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

export const uploadFile = async (
    uploadFileRequest: UploadFileRequestDto
): Promise<File> => {
    const formData = new FormData();
    formData.append("file", uploadFileRequest.file);

    const { data } = await axiosInstance.post<File>(
        `${FILE_ENDPOINT_PREFIX}/upload-file`,
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

