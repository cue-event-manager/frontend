import { memo } from "react";
import type { RefObject } from "react";
import {
    Avatar,
    Box,
    CircularProgress,
    Paper,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { ChatMessage } from "@/domain/chat/ChatMessage";

type ChatMessagesListProps = {
    messages: ChatMessage[];
    isLoading: boolean;
    messagesEndRef: RefObject<HTMLDivElement | null>;
};

function ChatMessagesListComponent({ messages, isLoading, messagesEndRef }: ChatMessagesListProps) {
    const theme = useTheme();

    return (
        <Stack spacing={2}>
            {messages.map((message) => (
                <Box
                    key={message.id}
                    sx={{
                        display: "flex",
                        justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                        gap: 1,
                    }}
                >
                    {message.sender === "bot" && (
                        <Avatar
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                width: 32,
                                height: 32,
                            }}
                        >
                            <SmartToyIcon sx={{ fontSize: 20 }} />
                        </Avatar>
                    )}
                    <Box sx={{ maxWidth: "75%" }}>
                        <Paper
                            elevation={1}
                            sx={{
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor:
                                    message.sender === "user"
                                        ? theme.palette.primary.main
                                        : theme.palette.background.paper,
                                color:
                                    message.sender === "user"
                                        ? theme.palette.primary.contrastText
                                        : theme.palette.text.primary,
                            }}
                        >
                            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                {message.content}
                            </Typography>
                        </Paper>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: "block",
                                mt: 0.5,
                                px: 1,
                                textAlign: message.sender === "user" ? "right" : "left",
                            }}
                        >
                            {format(message.timestamp, "HH:mm", { locale: es })}
                        </Typography>
                    </Box>
                    {message.sender === "user" && (
                        <Avatar
                            sx={{
                                bgcolor: theme.palette.secondary.main,
                                width: 32,
                                height: 32,
                            }}
                        >
                            <PersonIcon sx={{ fontSize: 20 }} />
                        </Avatar>
                    )}
                </Box>
            ))}
            {isLoading && (
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Avatar
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            width: 32,
                            height: 32,
                        }}
                    >
                        <SmartToyIcon sx={{ fontSize: 20 }} />
                    </Avatar>
                    <Paper
                        elevation={1}
                        sx={{
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: theme.palette.background.paper,
                        }}
                    >
                        <CircularProgress size={20} />
                    </Paper>
                </Box>
            )}
            <div ref={messagesEndRef} />
        </Stack>
    );
}

export const ChatMessagesList = memo(ChatMessagesListComponent);
