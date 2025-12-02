import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { ChatMessage } from "@/domain/chat/ChatMessage";
import type { MessageResponseDto } from "@/domain/common/MessageResponseDto";
import { sendMessage as sendChatMessage } from "@/services/chat.service";

export const useChat = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const sendMessageMutation = useMutation<MessageResponseDto, unknown, string>({
        mutationFn: (message: string) => sendChatMessage(message),
        onMutate: (message: string) => {
            // Add user message immediately
            const userMessage: ChatMessage = {
                id: `user-${Date.now()}`,
                content: message,
                sender: "user",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, userMessage]);
        },
        onSuccess: (data) => {
            // Add bot response
            const botMessage: ChatMessage = {
                id: `bot-${Date.now()}`,
                content: data.message,
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
        },
        onError: (error) => {
            // Add error message
            const errorMessage: ChatMessage = {
                id: `error-${Date.now()}`,
                content: t("chat.messages.error"),
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            console.error("Error sending message:", error);
        },
    });

    const sendMessage = useCallback(
        (message: string) => {
            if (message.trim()) {
                sendMessageMutation.mutate(message);
            }
        },
        [sendMessageMutation]
    );

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    return {
        messages,
        sendMessage,
        clearMessages,
        isLoading: sendMessageMutation.isPending,
    };
};
