import { Box, Button, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { UserState } from '../context/UserContext'
import Sender from './Sender'
import OneToOneChat from './OneToOneChat'
import GroupSection from './GroupSection'

function ChatSection() {

    const {selectedChat } = UserState()





    return (
        <>
            {!selectedChat ?
                <Box
                    h='100%'
                    w='100%'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'

                >
                    <Text
                        fontSize='5xl'
                    >
                        Select chat to communicate
                    </Text>
                </Box>
                :
                !selectedChat.isGroupe
                    ?
                    <OneToOneChat/>
                    : 
                    <GroupSection/>
            }
        </>
    )
}

export default ChatSection
