import { Box , Text } from '@chakra-ui/react'
import React from 'react'
import ChatSection from './ChatSection'

function Channel() {
    return (
        <Box
            bgColor='white'
            width='55%'
            height='calc(100vh - 100px)'
            borderRadius='5px'
            padding='20px'
            display='flex'
            justifyContent='center'
        >
            <ChatSection />
        </Box>
    )
}

export default Channel
