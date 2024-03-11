const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./DB/activate')
const userRouter = require('./routes/usersRoutes')
const chatRouter = require('./routes/chatRoutes')
const messageRouter = require('./routes/messageRoutes')
const socket = require('socket.io')
const path = require('path')

connectDB(process.env.MONGOO_URI)


app.use(cors({
    origin : 'http://localhost:5173'
}))

app.use(express.json())

const port = process.env.PORT




app.use('/api/v1/user', userRouter)
app.use('/api/v1/chat',chatRouter)
app.use('/api/v1/message',messageRouter)


const __dirname1 = path.resolve("..")


if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname1,"Client/dist")))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,'Client','dist','index.html'))
    })

}



const server = app.listen(port, () => {
    console.log(`server is listening to the port ${port}`)
})

const io = socket(server , {
    cors : {
        origin : 'http://localhost:5173',
        credentials: true,
    }
})


io.on("connection" , (socket)=>{

    socket.emit('connection')

    socket.on('setup',(user)=>{
        socket.join(user._id)
    })


    socket.on('join chat' , (room)=>{
        
        socket.join(room)

    })

    socket.on('new message',(newMessage)=>{

        let chat = newMessage.chat

        if(!chat.users){
            return console.log('chat.users is not defiend');
        }

        console.log('dumb console1',newMessage.sender._id)


        chat.users.forEach(user => {
            console.log('dumb console2',user._id)
            if(newMessage.sender._id === user._id) return

            socket.in(user._id).emit('message recieved', newMessage)


        });


    })


    socket.on('typing',(room,user)=>{socket.in(room).emit('typing',user)})
    socket.on('stop typing',(room)=>{socket.in(room).emit('stop typing')})


    
})
