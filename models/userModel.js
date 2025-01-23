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

userSchema.pre('compare',async function(painText,Userpassword){
    return await bcrypt.compare(painText,Userpassword)
   
})
userSchema.methods.generateToken = function(){
    return JWT.sign({_id:this._id},'SECRETE',{expiresIn:"7d"})
}
const UserSchema = mongoose.model('User',userSchema);
module.exports = UserSchema;

