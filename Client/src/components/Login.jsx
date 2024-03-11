import React, { useState } from 'react'
import { VStack, Input, FormControl, FormLabel, InputRightElement, InputGroup, Button, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [show, setShow] = useState(true)
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()


    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/login', { email: values.email, password: values.password })

            console.log(response)
            setValues({
                email: '',
                password: ''
            })
            localStorage.setItem('user' , JSON.stringify(response.data))
            setLoading(false)
            navigate('/chat')


        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    return (
        <VStack spacing='10px'>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    name = 'email'
                    value={values.email}
                    variant='flushed'
                    placeholder='email'
                    onChange={changeHandler}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        name = 'password'
                        value={values.password}
                        onChange={changeHandler}
                        type={show ? 'password' : 'text'}
                        variant='flushed'
                        placeholder='password'
                    />
                    <InputRightElement>
                        <Button bg='none' _hover='none' onClick={() => { setShow(!show) }}>{show ? "Show" : "Hide"}</Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                onClick={submitHandler}
                bg='#90CDF4'
                _hover='none'
                color='black'
                marginTop='20px'
                p={!loading ? '20px' : '30px'}
                w="100%"
            >
                {!loading ? 'Login' : <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    /> 
                }
            </Button>
            {/* <Button
                variant='solid'
                colorScheme='red'
                _hover='none'
                color='black'
                marginTop='20px'
                p='20px'
                w="100%"
            >
                Enter as a guest
            </Button> */}
        </VStack>
    )
}

export default Login
