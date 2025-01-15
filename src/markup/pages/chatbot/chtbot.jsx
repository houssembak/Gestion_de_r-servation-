import React, { useState } from 'react';
import axios from 'axios';

const ChatbotComponent = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: 'user', text: message };
        setChatHistory([...chatHistory, userMessage]);

        try {
            const response = await axios.post('http://localhost:3000/api/chatbot', { message });
            const botResponse = { sender: 'bot', text: response.data.generated_text };
            setChatHistory((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error.message);
        }

        setMessage('');
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatbox}>
                <div style={styles.chatHistory}>
                    {chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.message,
                                alignSelf: chat.sender === 'user' ? 'flex-end' : 'flex-start',
                                backgroundColor: chat.sender === 'user' ? '#d1f7c4' : '#f1f1f1',
                            }}
                        >
                            <strong>{chat.sender === 'user' ? 'Vous' : 'Chatbot'}:</strong> {chat.text}
                        </div>
                    ))}
                </div>
                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tapez votre message..."
                        style={styles.input}
                    />
                    <button onClick={handleSendMessage} style={styles.button}>
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f7f9fc',
    },
    chatbox: {
        width: '400px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    chatHistory: {
        flex: 1,
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        gap: '10px',
    },
    message: {
        padding: '10px',
        borderRadius: '12px',
        maxWidth: '75%',
        wordWrap: 'break-word',
    },
    inputContainer: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #ddd',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '20px',
        border: '1px solid #ddd',
        outline: 'none',
        marginRight: '10px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
};

export default ChatbotComponent;
