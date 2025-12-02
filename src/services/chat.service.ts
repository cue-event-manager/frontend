import axiosInstance from "@/config/axiosConfig";
import type { ChatProcessRequestDto } from "@/domain/chat/ChatProcessRequestDto";
import type { MessageResponseDto } from "@/domain/common/MessageResponseDto";
import { AI_SERVICE } from "./constants";

const CHAT_ENDPOINT_PREFIX = `${AI_SERVICE}/chat`;

export const sendMessage = async (message: string): Promise<MessageResponseDto> => {
    const payload: ChatProcessRequestDto = { message };
    const { data } = await axiosInstance.post<MessageResponseDto>(
        `${CHAT_ENDPOINT_PREFIX}/process`,
        payload
    );
    return data;
};
