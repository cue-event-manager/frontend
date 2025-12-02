export type ChatSender = 'user' | 'bot';

export interface ChatMessage {
    id: string;
    content: string;
    sender: ChatSender;
    timestamp: Date;
}
