const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT  = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        
        city:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        profilePic:{
            type:String,
        }
},{
    timestamps:true
})

userSchema.pre('save', async function(){
     this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword = async function (plainText) {
    return await bcrypt.compare(plainText, this.password);
};

userSchema.methods.generateToken = function(){
    return JWT.sign({_id:this._id},'abc',{expiresIn:"7d"})
}
const UserSchema = mongoose.model('User',userSchema);
module.exports = UserSchema;

