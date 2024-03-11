import React, { useEffect } from 'react'
import NavBar from '../../components/NavBar'
import { Box, useDisclosure } from '@chakra-ui/react'
import ChatList from '../../components/ChatList'
import { UserState } from '../../context/UserContext'
import Channel from '../../components/Channel'


function Chat() {

  const {user} = UserState()
  

  return (
    <Box
      width='100%'
    >
      {user &&
        <div>
            <NavBar/>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              padding='20px'
            >
              <ChatList />
              <Channel/>
            </Box>
        </div>}
    </Box>
  )
}

export default Chat
