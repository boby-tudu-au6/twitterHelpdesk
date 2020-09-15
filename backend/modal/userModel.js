import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
    id:Number,
    name:String,
    screen_name:String,
    description:String,
    followers:String,
    profile_image_url_https:String,
    friends:Number,
})


const User = mongoose.model("user",userSchema)
export default User