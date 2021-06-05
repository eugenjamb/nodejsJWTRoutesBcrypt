require('dotenv').config()
const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')


function generateAccessToken(id, roles) {
    const payload = {
        id,
        roles,
    }
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '10min'})
}

class authController{

    async registration(req,res){

        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).json({ message: 'Registration Error', errors })
            const { username, password } = req.body
            const candidate = await User.findOne({ username })
            if (candidate) return res.sendStatus(400).json({ message: 'Username taken, try another' })
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ value: 'USER' })
            const user = new User({ username, password: hashPassword, roles: [userRole.value] })
            await user.save()
            res.json({message: 'The user was signed up'})
        } catch(e) {
            console.log(e)
            res.sendStatus(400).json({ message: 'Registration error' })
        }

    }

    async login(req,res){
   
        try{

            const { username, password } = req.body
            const user = await User.findOne({ username })
            if(!user) return res.sendStatus(400).json({ message: 'User not found!' })
            const validatePassword = bcrypt.compareSync(password, user.password)
            if (!validatePassword) return res.sendStatus(400).json({ message: 'Incorrect password!' })
            const token = generateAccessToken(user._id, user.roles)
            res.json({token})

        } catch(e) {
            console.log(e)
        }

    }

    async getUser(req,res){
        
        try{ 
            const user = await User.findOne({_id: req.user.id})
            res.json(user)
        } catch(e) {
            console.log(e)
        }

    }

}


module.exports = new authController()