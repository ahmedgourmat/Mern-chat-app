import React from 'react'
import { Container, Box, Text , Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../../components/Login'
import Signup from '../../components/Signup'



function Home() {
  return (
    <Container maxW="xl" centerContent >
      <Box
        p={3}
        display={"flex"}
        bgColor={"white"}
        w='100%'
        justifyContent={"center"}
        borderRadius="5px"
        borderWidth='1px'
        m='20px 0px'
      >
        <Text display='flex' fontSize={"4xl"} color='black' >
          Chat<Text color='#0BC5EA' >Book</Text>
        </Text>
      </Box>
      <Box 
        p={3}
        display={"flex"}
        bgColor={"white"}
        w='100%'
        justifyContent={"center"}
        borderRadius="5px"
        borderWidth='1px'
      >
        <Tabs variant='soft-rounded' colorScheme='blue' w='100%'>
          <TabList>
            <Tab w='50%'>Login</Tab>
            <Tab w='50%'>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup></Signup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home
