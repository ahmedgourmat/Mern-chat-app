import React from 'react'
import { Box, Text, Image, Menu, MenuButton, MenuList, MenuItem, Button, MenuGroup} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { UserState } from '../context/UserContext'
import Profil from './Profil'


function Personal() {

    
  const {user , setUser} = UserState()
  const navigate = useNavigate()
 
  const disconnect = ()=>{
    localStorage.removeItem('user')
    setUser({})
    navigate('/')
  }

  

    return (
        <Menu>
            <MenuButton
                height='40px' as={Button}  >
                <Box
                    display='flex'
                    alignItems='center'
                    gap='20px'
                >
                    <Image
                        borderRadius='full'
                        boxSize='30px'
                        src={user.user.picture}
                        alt='Dan Abramov'
                    />
                    <Text>
                        {user.user.name}
                    </Text>
                </Box>
            </MenuButton>
            <MenuList>
                <MenuGroup >
                    <Profil><MenuItem>My Account</MenuItem></Profil>
                </MenuGroup>
                <MenuGroup >
                    <MenuItem onClick={disconnect} >Disconnect</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}

export default Personal
