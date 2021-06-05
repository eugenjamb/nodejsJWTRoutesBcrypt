require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function(roles) {
   
    return function(req,res,next){

        if (req.method === "OPTIONS") next()

        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) return res.sendStatus(403).json({ message: "User not authorized"})
            const {roles: userRoles} = jwt.verify(token, process.env.SECRET)
            let hasRole = false
            console.log(userRoles)
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true
                }
            })
            if(!hasRole) return res.sendStatus(403).json({ message: "User not authorized"})
            next()

        } catch(e) {
            console.log(e)
            return res.sendStatus(403).json({ message: "User not authorized"})
        }
    }
}

