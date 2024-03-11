import { CloseIcon } from '@chakra-ui/icons'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'

function AddUsers({ name , deleteHandler , id}) {
  return (
    <Box
        display='flex'
        alignItems='center'
        gap='5px'
        bgColor='#46d4e6'
        p='5px'
        borderRadius='2px'
        mt='10px'
    >
      <Text>{name}</Text>
      <CloseIcon cursor='pointer' onClick={()=>{deleteHandler(id)}} />
    </Box>
  )
}

export default AddUsers
