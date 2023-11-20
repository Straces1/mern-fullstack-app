const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({ 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


// CUSTOM STATIC METHOD TO SIGNUP USER
userSchema.statics.signup = async function (email, password) {

    // validation
    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('This is not valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    // you can not use the User here, because here is not baked yet, but this works ;)
    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// CUSTOM STATIC METHOD TO LOGIN USER
userSchema.statics.login = async function (email, password) {
    
    // validation
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if(!user){
        throw Error('Incorrect email')
    }
    
    const match = await bcrypt.compare(password, user.password)

    if(!match){ throw Error('Incorrect password') }

    return user


}

module.exports = mongoose.model('User', userSchema)