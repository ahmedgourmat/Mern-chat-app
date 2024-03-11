import { Box, Image, Text, background } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { UserState } from '../context/UserContext'

function OneChat({users , message , chat , isSelected, onSelect}) {

    const {user , selectedChat , setSelectedChat} = UserState()
    const [data , setData] = useState({})
    const [bool , setBool] = useState(false)

    const genProfile = ()=>{
        if(users[0]._id === user.user._id){
            setData(users[1])
        }else{
            setData(users[0])
        }
    }

    useEffect(()=>{
        genProfile()
    },[])

  return (
    <Box
        cursor='pointer'
        display='flex'
        alignItems='center'
        gap='20px'
        w='100%'
        padding='6' 
        boxShadow='lg' 
        bg={
            isSelected ?
                '#1ecbe1'
            :
                'white'
        }
        onClick={()=>{
            onSelect(chat)
        }}
    >
        <Image
            borderRadius='full'
            boxSize='50px'
            src={data.picture}
            alt={data.name}
        />
        <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
        >
            <Text fontSize='2xl' >
                {chat.isGroupe ? chat.chatName : data.name}
            </Text>
            <Text fontSize='l' color='grey'>
                {/* {message} */}
            </Text>
        </Box>
    </Box>
  )
}

export default OneChat
