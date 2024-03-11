import { Box, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { UserState } from '../context/UserContext'

function Messages({content , sender }) {

    const {user} = UserState()

    const [bool , setBool] = useState(null)


    const mySide = ()=>{
        sender._id === user.user._id ? setBool(false) : setBool(true)
    }

    useEffect(()=>{
        mySide()
    },[])


  return (
    <Box
        w='100%'
        p="5px"
        display='flex'
        flexDir={bool? 'row' : 'row-reverse' }
        alignItems='center'
        justifyContent='flex-start'
        gap='10px'
    >
        <Image
            borderRadius='full'
            boxSize='40px'
            src={sender.picture}
            alt={sender.name}
          />
      <Text
        p='5px 10px'
        maxW='50%'
        bg={bool? '#15c5ea' :'#20df90' }
        borderRadius='25px'
      >
        {content}
      </Text>
    </Box>
  )
}

export default Messages
