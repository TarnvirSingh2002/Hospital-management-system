import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
// import { io } from 'socket.io-client';

export default function MessageBoard() {

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef(null);


    // const socket = io('http://localhost:5000');


    // useEffect(() => { // it initially run and run again on every socket change
    //     socket.on('newMessage', (newMessage) => {
    //         setMessages((prv) => [...prv, newMessage])
    //     })

    //     return () => {
    //         socket.disconnect();
    //     };
    // }, [socket]);



    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        try {
            await axios.post('http://localhost:4000/api/v1/message/sendprivatemess',
                { message: inputValue, link: "68344a37f2260cb4b3b28484" },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => {
                    //   console.log('Message sent:', inputValue);

                    setMessages(prev => {
                        const newMessages = [...prev, {
                            link: "1212",
                            message: inputValue
                        }];
                        console.log('New messages state:', newMessages);
                        return newMessages;
                    });

                    setInputValue('');
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    useEffect(() => {
        const fetchdata = async () => {
            await axios.get('http://localhost:4000/api/v1/message/allmessage')
                .then((response) => {
                    console.log("response is", response.data);
                    setMessages(response.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        fetchdata();
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const styles = {
        wrapper: {
            width: '100%',
            maxWidth: '600px',
            height: "1000px",
            maxHeight: 'calc(100vh - 160px)', // Adjust if header/footer height changes
            margin: '110px 0 0 500px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 0 15px rgba(0,0,0,0.2)',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#e5ddd5',
        },
        header: {
            backgroundColor: '#075e54',
            color: 'white',
            padding: '16px',
            fontSize: '20px',
            fontWeight: 'bold',
        },
        chatContainer: {
            flex: 1,
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            backgroundColor: '#ece5dd',
            height: "400px"
        },
        message: {
            maxWidth: '75%',
            padding: '10px',
            margin: '6px 0',
            borderRadius: '8px',
            fontSize: '15px',
            lineHeight: '1.4',
            boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
        },
        inputArea: {
            display: 'flex',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            borderTop: '1px solid #ccc',
        },
        input: {
            flex: 1,
            padding: '10px 14px',
            border: '1px solid #ccc',
            borderRadius: '20px',
            outline: 'none',
            fontSize: '15px',
        },
        sendButton: {
            marginLeft: '10px',
            padding: '10px 18px',
            backgroundColor: '#128c7e',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '15px',
        },
    };

    return (

        <div style={styles.wrapper}>
            <div style={styles.header}>💬 Chat</div>

            <div style={styles.chatContainer}>
                {messages.map((element, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.message,
                            // alignSelf: message.sender === 'me' ? 'flex-end' : 'flex-start',
                            alignSelf: "flex-end",
                            backgroundColor: '#dcf8c6',
                        }}
                    >
                        {element.message}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div style={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Type a message"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    style={styles.input}
                />
                <button onClick={sendMessage} style={styles.sendButton}>Send</button>
            </div>
        </div>
    );
};

