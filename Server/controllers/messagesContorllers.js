const Message = require('../models/messageSchema')
const User = require('../models/userSchema')
const Chat = require('../models/chatSchema')

const createMessage = async(req , res)=>{

    const {content , chatId} = req.body


    try {
        
        if(!content || !chatId){
            throw Error('The message should not be empty')
        }

        let message = await Message.create({sender : req.user._id , content , chat : chatId})

        message = await Message.findOne({_id : message._id})
        .populate('sender' , 'name email picture')
        .populate('chat')

        message = await User.populate(message ,{
            path : 'chat.users',
            select : 'name email picture',
        })

        await Chat.findByIdAndUpdate(chatId , {latestMessage : message})


        res.status(201).json(message)


    } catch (error) {
        res.status(500).json({error : error.message}) 
    }

}


const fetchMessages = async(req ,res)=>{

    const {chatId} = req.params

    try {
        
        if(!chatId){
            throw Error('Please Select the chat')
        }

        const messages = await Message.find({chat : chatId})
        .populate('sender' , 'name email picture')
        .populate('chat')

        res.status(200).json(messages)

    } catch (error) {
        res.status(404).json({error : error.message})
    }

}


module.exports = {createMessage , fetchMessages }