import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import {
    Box,
    Fab,
    Paper,
    Typography,
    IconButton,
    TextField,
    Avatar,
    Fade,
    useTheme,
    alpha,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';
import { useChat } from '@/features/chat/hooks/useChat';
import { useAuth } from '@/contexts/authContext';
import { ChatMessagesList } from './ChatMessagesList';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const { t } = useTranslation();
    const { user } = useAuth();
    const { messages, sendMessage, clearMessages, isLoading } = useChat();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (inputMessage.trim() && !isLoading) {
            sendMessage(inputMessage);
            setInputMessage('');
        }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!user) {
        return null; 
    }

    return (
        <>
            <Fade in={isOpen}>
                <Paper
                    elevation={8}
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 16, sm: 90 },
                        right: { xs: 16, sm: 24 },
                        width: { xs: 'calc(100vw - 32px)', sm: 400 },
                        maxWidth: 400,
                        height: { xs: 'calc(100vh - 100px)', sm: 600 },
                        maxHeight: 600,
                        display: isOpen ? 'flex' : 'none',
                        flexDirection: 'column',
                        borderRadius: 3,
                        overflow: 'hidden',
                        zIndex: 1300,
                        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`,
                    }}
                >
                    <Box
                        sx={{
                            p: 2,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar
                                sx={{
                                    bgcolor: alpha(theme.palette.common.white, 0.2),
                                    width: 40,
                                    height: 40,
                                }}
                            >
                                <SmartToyIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {t('chat.header.title')}
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    {t('chat.header.subtitle')}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            {messages.length > 0 && (
                                <IconButton
                                    size="small"
                                    onClick={clearMessages}
                                    aria-label={t('chat.actions.clearHistory')}
                                    sx={{ color: 'white', mr: 0.5 }}
                                >
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            )}
                            <IconButton
                                size="small"
                                onClick={() => setIsOpen(false)}
                                aria-label={t('chat.actions.close')}
                                sx={{ color: 'white' }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            backgroundColor: theme.palette.mode === 'dark'
                                ? theme.palette.background.default
                                : theme.palette.grey[50],
                        }}
                    >
                        {messages.length === 0 ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    textAlign: 'center',
                                    gap: 2,
                                }}
                            >
                                <SmartToyIcon
                                    sx={{
                                        fontSize: 64,
                                        color: theme.palette.primary.main,
                                        opacity: 0.5,
                                    }}
                                />
                                <Typography variant="body1" color="text.secondary">
                                    {t('chat.empty.greeting')}
                                    <br />
                                    {t('chat.empty.prompt')}
                                </Typography>
                            </Box>
                        ) : (
                            <ChatMessagesList
                                messages={messages}
                                isLoading={isLoading}
                                messagesEndRef={messagesEndRef}
                            />
                        )}
                    </Box>

                    <Box
                        sx={{
                            p: 2,
                            backgroundColor: theme.palette.background.paper,
                        borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder={t('chat.input.placeholder')}
                            value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                multiline
                                maxRows={3}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                            <IconButton
                                color="primary"
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                aria-label={t('chat.actions.send')}
                                sx={{
                                    width: 44,
                                    height: 44,
                                    bgcolor: theme.palette.primary.main,
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.dark,
                                    },
                                    '&.Mui-disabled': {
                                        bgcolor: theme.palette.action.disabledBackground,
                                    },
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            </Fade>

            {!isOpen && (
                <Fab
                    color="primary"
                    aria-label={t('chat.accessibility.open')}
                    onClick={() => setIsOpen(true)}
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 16, sm: 24 },
                        right: { xs: 16, sm: 24 },
                        zIndex: 1300,
                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.5)}`,
                        },
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    <ChatIcon />
                </Fab>
            )}
        </>
    );
}
