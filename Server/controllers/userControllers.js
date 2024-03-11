const User = require('../models/userSchema')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uploadImage = require('../middleware/uploadingImage')


const createToken = (_id)=>{
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '10d' })
}


const signup = async(req , res)=>{
    const {name , email , password , picture} = req.body

    try {

        if(!name || !email || !password){
            throw Error("Please Fill All The Required Fields")
        }

        const data = await User.findOne({email})

        if(data){
            throw Error('This email is already taken')
        }


        if(!validator.default.isEmail(email)){
            throw Error('Use an existing email')
        }


        if(password.length <= 8){
            throw Error('Password should have 8 characters or above')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        let image 

        await uploadImage(picture)
        .then((url)=>{
            image = url
            console.log(image)
        })
        .catch((err)=>{
            throw Error(err)
        })
    
        let user = await User.create({name , email , password : hashedPassword , picture : image})
        
        user = await User.findOne({_id : user._id}).select('-password')

        const token = createToken(user._id)

        res.status(201).json({user , token})


    } catch (error) {
        res.status(500).json({error : error.message})
    }

}



const login = async(req,res)=>{
    const {email , password} = req.body

    try {
        
        if(!email || !password){
            throw Error('Fill the required fields')
        }

        let user = await User.findOne({email})

        if(!user){
            throw Error('There are no user with this email')
        }

        const matched = await bcrypt.compare(password , user.password)

        if(!matched){
            throw Error('Incorrect Password')
        }

        const token = createToken(user._id)

        user = await User.findOne({_id : user._id}).select('-password')

        res.status(201).json({user , token})

    } catch (error) {
        res.status(501).json({error : error.message})
    }

}


const getUsers = async(req , res)=>{

    const keyword = req.query.search ? {
        $or :[
            { name: { $regex: req.query.search, $options: "i" } }
        ]
    } : {}

    try {

        const allUsers = await User.find(keyword).find({_id : {$ne : req.user._id}}).select('-password')

        if(!allUsers){
            throw Error('There is no user')
        }
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(404).json({error : error.message})
    }


}

module.exports = {login , signup , getUsers}