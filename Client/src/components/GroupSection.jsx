import { Box, Button, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Sender from './Sender'
import { UserState } from '../context/UserContext'
import axios from 'axios'
import Messages from './Messages'

function GroupSection() {

    const {user , selectedChat} = UserState()

    const [message , setMessage] = useState('')

    const [messages , setMessages] = useState([])

    const createMessage = async()=>{

        console.log(message , ' ' , selectedChat._id)

        const response = await axios.post('http://localhost:8080/api/v1/message',{content : message , chatId : selectedChat._id},{
            headers : {
                Authorization : 'Barear ' + user.token
            }
        })


        if( response.status>= 200 || response.status< 300 ){
            console.log(response.data)
            setMessages([...messages , message])
            setMessage('')
            return
        }

        console.log(response)

    }

    const fetchMessages = async()=>{

        const response = await axios.get(`http://localhost:8080/api/v1/message/${selectedChat._id}`,{
            headers : {
                Authorization : 'Barear ' + user.token
            }
        })

        if( response.status>= 200 || response.status< 300 ){
            console.log(response.data)
            
            return
        }

        console.log(response)
        
    }

    const changeHandler = (e)=>{
        setMessage(e.target.value)
    }


    useEffect(()=>{
        fetchMessages()
    },[selectedChat])


    return (
        <Box
            display='flex'
            flexDir='column'
            height='100%'
            bg='#edf0f1'
            justifyContent='space-between'
            w='100%'
            p='5px'
        >
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                w='100%'
                bg='white'
                p='5px'
            >
                <Text
                    fontSize='3xl'
                >
                    {selectedChat.chatName}
                </Text>
                <Sender data={selectedChat}>
                    <Button
                        colorScheme='blue'
                    >
                        See Group Member
                    </Button>
                </Sender>
            </Box>
            <Box
                h='100%'
                overflowY='scroll'
            >
                {messages.map((elem) => (
                                    <Messages key={elem._id} content={elem.content} sender={elem.sender} />
                ))}
            </Box>
            <Box
                display='flex'
                gap='5px'
                w='100%'
            >
                <Input variant='filled' placeholder='Enter your message' borderRadius='0px' value={message} onChange={changeHandler} />
                <Button colorScheme='green' onClick={createMessage} >Send</Button>
            </Box>
        </Box>
    )
}

export default GroupSection
