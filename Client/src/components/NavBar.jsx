import { Box, Text, useDisclosure} from '@chakra-ui/react'
import React, { useContext } from 'react'
import Search from './Search'
import Personal from './Personal'
import Profil from './Profil'
import Notification from './Notification'




function NavBar() {


  return (
    <Box
      padding='10px 20px'
      width='100%'
      bgColor='#f2fdfd'
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      gap='10px'
    >
      <Search />
      <Text
        fontSize='2xl'
      >CHAT BOOK</Text>
      <Notification/>
      <Personal/>
      <Profil />
    </Box>
  )
}

export default NavBar
