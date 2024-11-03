import { Box, Button, Input, Text } from '@chakra-ui/react';
import React, { useEffect , useRef, useState } from 'react';
import Sender from './Sender';
import { UserState } from '../context/UserContext';
import axios from 'axios';
import Messages from './Messages';
import io from 'socket.io-client'


const ENDPOINT = 'http://localhost:8080'
let socket , selectedChatCompare

function OneToOneChat() {
    const { user, selectedChat , notification , setNotification } = UserState();
    const [connected , setConnected] = useState(false)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [typing , setTyping] = useState(false)
    const toBottom = useRef(null)


    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit('setup',user.user)
        socket.on('connection' , ()=>{
            setConnected(true)
        })
        socket.on('typing',(checkUser)=>{

            console.log('here is typing')
            console.log('user.user._id',user.user._id)
            console.log('checkUser._id',checkUser._id)
            if(checkUser._id == user.user._id){
                setTyping(false)
            }else{
                setTyping(true)
            }
        })
        socket.on('stop typing',()=>{
            setTyping(false)
        })

    },[])

    useEffect(()=>{

        console.log('here is the lala')


        socket.on('message recieved',(newMessage)=>{

            if(selectedChat._id != newMessage.chat._id){

                if(!notification.includes(newMessage)){
                    setNotification([newMessage,...notification])
                }
            }else{
                setMessages([...messages , newMessage])
            }
        })
    })

    console.log


    const getFullSender = () => {
        if (selectedChat.users[0]._id == user.user._id) {
            return selectedChat.users[1];
        }else {
            return selectedChat.users[0];
        }
    };

    const createMessage = async () => {
        const response = await axios.post(
            'http://localhost:8080/api/v1/message',
            { content: message, chatId: selectedChat._id },
            {
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            }
        );

        if (response.status >= 200 && response.status < 300) {
            socket.emit('stop typing',selectedChat._id)
            setTyping(false)
            setMessages([...messages, response.data]);
            setMessage('');
            socket.emit('new message',response.data)

            return;
        }

        console.log(response);
    };

    const fetchMessages = async () => {
        const response = await axios.get(`http://localhost:8080/api/v1/message/${selectedChat._id}`, {
            headers: {
                Authorization: 'Bearer ' + user.token,
            },
        });

        

        

        if (response.status >= 200 && response.status < 300) {
            setMessages(response.data);
            socket.emit('join chat' , selectedChat._id)


            return;
        }

        console.log(response);
    };

    const changeHandler = (e) => {
        setMessage(e.target.value);

        socket.emit('typing',selectedChat._id,user.user)

        if(e.target.value == ''){
            socket.emit('stop typing',selectedChat._id)
            setTyping(false)
        }

    };

    useEffect(()=>{
        if(toBottom.current){
            toBottom.current.scrollIntoView()
        }
    },[messages])

    useEffect(() => {
        fetchMessages()
        selectedChatCompare = selectedChat
    }, [selectedChat]);

    return (
        <Box display='flex' flexDir='column' height='100%' bg='#edf0f1' justifyContent='space-between' w='100%' p='5px'>
            <Box display='flex' alignItems='center' justifyContent='space-between' w='100%' bg='white' p='5px'>
                <Text fontSize='3xl'>{getFullSender().name}</Text>
                <Sender data={getFullSender()}>
                    <Button colorScheme='blue'>See Profil</Button>
                </Sender>
            </Box>
            <Box h='100%' overflowY='scroll' >
                {messages.map((elem) => (
                    <Messages key={elem._id} content={elem.content} sender={elem.sender} />
                ))}
                <Box ref={toBottom}></Box>
            </Box>
            {
                    typing ? <Text bgColor='transparent'>Typing...</Text> : <></>
            }
            <Box display='flex' gap='5px' w='100%'>
                <Input variant='filled' placeholder='Enter your message' borderRadius='0px' value={message} onChange={changeHandler} />
                <Button colorScheme='green' onClick={createMessage}>
                    Button
                </Button>
            </Box>
        </Box>
    );
}

export default OneToOneChat;
