import mongoose from 'mongoose'

const Schema = mongoose.Schema

const tweetSchema = new Schema({
    created_at: String,
    id:String,
    text:String,
    user:Object,
    in_reply_to_user_id:String,
    in_reply_to_status_id:String,
    now:{type:Date,default:Date.now}
})
tweetSchema.index({ user: 1 });

const Tweet = mongoose.model("tweet",tweetSchema)
export default Tweet