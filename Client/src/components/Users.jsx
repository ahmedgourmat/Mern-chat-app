import { Box, Image , Tooltip } from '@chakra-ui/react'
import React from 'react'

function Users({ name, picture,onClose , id , functionHandler }) {

  return (
    <Box>
        <Box
          display='flex'
          alignItems='center'
          gap='10px'
          _hover={{
            cursor: 'pointer'
          }}
          onClick={()=>{
            functionHandler(id)
            onClose()
          }}
        >
          <Image
            borderRadius='full'
            boxSize='50px'
            src={picture}
            alt={name}
          />
          <Tooltip width='100%' label={`click to chat with ${name}`} aria-label='A tooltip'>
            {name}
          </Tooltip>
        </Box>
    </Box>
  )
}

export default Users
