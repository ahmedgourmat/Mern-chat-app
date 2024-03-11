import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Spinner, VStack } from '@chakra-ui/react'
import React , {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate()
    const [show , setShow] = useState(true)
    const [loading, setLoading] = useState(false)
    const [values , setValues] = useState({
        name : '',
        email : '',
        password : ''
    })
    
    const [url , setUrl] = useState(null)

    const changeHandler = (e)=>{
        setValues({...values , [e.target.name] : e.target.value})
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };



    const uploadImage = async (event) => {
        const files = event.target.files;
        console.log(files.length);

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            setUrl(base64)
        }
    };

    const submitHandler = async(e)=>{
        e.preventDefault()
        const {name , email , password} = values
        setLoading(true)

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/signup',{name  ,email  , password , picture : url })
            setValues({
                name : '',
                email : '',
                password : ''
            })
            localStorage.setItem('user' , JSON.stringify(response.data))
            navigate('/chat')
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }


    


    return (
        <VStack spacing='10px'>
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input variant='flushed' value={values.name} placeholder='First name' name='name' onChange={changeHandler} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input variant='flushed' value={values.email} placeholder='email' name='email' onChange={changeHandler} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input 
                        value={values.password}
                        name = 'password'
                        onChange={changeHandler}
                        type={show ? 'password' : 'text'}
                        variant='flushed' 
                        placeholder='password' 
                    />
                    <InputRightElement>
                        <Button bg='none' _hover='none' onClick={()=>{setShow(!show)}}>{show ? "Show": "Hide"}</Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Upload Your Image</FormLabel>
                <Input 
                    type='file'
                    p='5px' 
                    accept='image/*'
                    onChange={uploadImage}
                    name="file"
                />
            </FormControl>
            <Button
                onClick={submitHandler}
                bg='#90CDF4'
                _hover='none'
                color='black'
                marginTop='20px'
                fontSize='1.5em'
                p={!loading ? '20px' : '30px' }
                w="100%"
            >
                {!loading ? 'Signin' : <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    /> 
                }
            </Button>
        </VStack>
    )
}

export default Signup
