// this middleware function is for authentication of a user before the 
// get request for workouts is responded
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // verify authentication -- using authorization headers property from the request (property living on the request)
    const { authorization } = req.headers

    // furts lets check if there is a authhorization
    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }
    // value of authorization looks like this:
    // 'Bearer fg28dcwid823erhdwqi.slfhwqf837rh3ifh3298.jdo2387ruyhoidh'
    // we need to split this string into two; berarer and the token
    // lets split it by space:
    const token = authorization.split(' ')[1]

    // verify the token
    try {
       const {_id} = jwt.verify(token, process.env.SECRET) // verify method returns payload, so here you destructure the id
       
       // now lets use the id to find the user in DB --> so here I'm attaching the user property to the request
       // remember, this is middleware so it runs before the actual request, so the user will be on than request before we run another middleware or actual request
       
       req.user = await User.findOne({ _id }).select('_id')
       // the select('_id') will return just the id instead of the whole document
        
       next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth