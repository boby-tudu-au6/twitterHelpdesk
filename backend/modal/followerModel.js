import mongoose from 'mongoose'
const Schema = mongoose.Schema

const followerSchema = new Schema({
    following:String,
    screen_name:String,
    id:Number,
    name:String,
    profile_image_url_https:String,
    statuses_count:Number
})

const Followers = mongoose.model("followers",followerSchema)
export default Followers