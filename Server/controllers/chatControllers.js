const Chat = require('../models/chatSchema')
const User = require('../models/userSchema')


const accessChat = async(req, res)=>{

    const {userId} = req.body

    if(!userId){
        throw Error('Enter user id')
    }


    let chat = await Chat.findOne({
        isGroupe : false ,
        $and : [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
          ],
    }).populate('users' , '-password')
    .populate('latestMessage')


    chat = await User.populate(chat , {
        path : 'latsetMessage.sender',
        select : 'name picture email'
    })
    
    console.log(chat)

    if(chat){
        res.status(200).json(chat)
    }else{
        const chatData = {
            chatName : 'sender',
            isGroupe : false,
            users : [req.user._id , userId]
        }

        try {
            let fullChat = await Chat.create(chatData)

            console.log(fullChat)

            fullChat = await Chat.findOne({_id : fullChat._id}).populate('users' , '-password')

            console.log(fullChat)

            res.status(201).json(fullChat)

        } catch (error) {
            res.status(500).json({error : error.message})
        }

    }
    

}


const fetchChat = async(req,res)=>{
    try {

        let data = await Chat.find({users : {$elemMatch : {$eq : req.user._id}}})
        .populate('users' , '-password')
        .populate('groupAdmin' , '-password')
        .populate('latestMessage')
        .sort({updatedAt : -1})

        data = await User.populate(data , {
            path : 'latestMessage.sender',
            select : 'name email picture'
        })


        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


const createGroupe = async(req,res)=>{
    const {chatName ,usersId} = req.body

    try {


        if(!chatName || !usersId){
            throw Error('Please fill all the fields')
        }
        console.log(usersId)

        let users = JSON.parse(usersId)

        console.log(users)

        if(usersId.length < 2){
            throw Error('The group must have more than two users')
        }

        users.push(req.user._id)

        console.log(users)

        
        const data = {
            chatName , 
            isGroupe : true , 
            users ,
            groupAdmin : req.user._id,
        }

        const creating = await Chat.create(data)
        const groupChat = await Chat.find({_id : creating._id}).populate('users' , '-password').populate('groupAdmin' , '-password')


        res.status(201).json(groupChat)

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


module.exports = {accessChat , fetchChat , createGroupe}