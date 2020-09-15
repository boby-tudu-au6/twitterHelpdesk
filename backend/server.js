import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'
import twitter from 'passport-twitter'
import './db'
import Twit from 'twit'
const cors = require('cors')
dotenv.config()
import User from './modal/userModel'
import Followers from './modal/followerModel'
import Tweet from './modal/tweetModel'
import bodyParser from 'body-parser'
import expressSession from 'express-session'

let consumer_key = process.env.TWITTER_CONSUMER_KEY
let consumer_secret = process.env.TWITTER_CONSUMER_SECRET
let access_token = null
let access_token_secret = null

const trustProxy = true;
let Strategy = twitter.Strategy
passport.use(new Strategy({
    consumerKey: consumer_key,
    consumerSecret: consumer_secret,
    callbackURL: 'http://127.0.0.1:3000',
    proxy: trustProxy
  },
  function(token, tokenSecret, profile, cb) {
    access_token = token
    access_token_secret = tokenSecret
    return cb(null, profile);
  }));
  

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


const app = express();
app.use(cors())
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(expressSession(
  { 
    secret: 'keyboard cat', resave: true, saveUninitialized: true 
  }));
function createTwit(){
  return new Twit({
    consumer_key,
    consumer_secret,
    access_token:access_token,
    access_token_secret:access_token_secret,
    timeout_ms: 60*1000, 
    strictSSL: false, 
  })
}
app.use(passport.initialize());
app.use(passport.session());
let userData = {}
app.get('/',passport.authenticate('twitter', { 
  failureRedirect: 'https://www.google.com'
}),
  async (req, res)=> {
    if(access_token!==null){
      
      let T = createTwit()
      let arr = []
      userData = {...userData,profile:req.user._json}
      
        const testdata = await User.find({id:req.user._json.id})
        if(testdata.length===0){
          T.get('followers/list',{screen_name:req.user._json.screen_name})
          .then(async ({data})=>{
            const test = await User.create({...req.user._json})
            userData = {...userData,followers:data.users}
            userData.followers.forEach(async item => {
              await Followers.create({...item,following:test.id})
            });

          
            T.get('statuses/mentions_timeline')
            .then(({data})=>{
              data.forEach(async item => {
                await Tweet.create({...item})
              })
            })
        })
      }

    return res.redirect("http://127.0.0.1:5000")
    }  
  }
)
app.get("/auth", async (req, res) => {
  try{
    const followers = await Followers.find({following:userData.profile.id})
    return res.json({userData, followers})
  }catch(err){
    res.json({err:err.message})
  }
});

app.post('/getchat',async (req,res)=>{
  const {from ,to} = req.body
  let chats = await Tweet.find({
    $or:[{in_reply_to_user_id:(to).toString()},
      {in_reply_to_user_id:(from).toString()},
    ]
  }).sort({now:-1})
  const users = await User.find()
  chats.forEach(async item=>{
    const state = users.forEach(item2=>{if(item2.id===item.user.id)return false})
    if(state!==false){
      await User.create({...item})
    }
  })
  chats = chats.map(item=>{
    if(
      (item.user.id===from && item.in_reply_to_user_id===(to).toString()) || 
      (item.user.id===to && item.in_reply_to_user_id=== (from).toString()))return item
  })
  res.json({chats})
})

app.post('/getprofile', async (req,res)=>{
  const {userid, screen_name} = req.body
  let T = createTwit()
  T.get('users/lookup', { screen_name })
  .then(({data})=>res.json({user:data[0]}))
  .catch(err=>console.log(err.message))
})


app.post('/poststatus', async (req,res)=>{
  const {screen_name,userid, chat} = req.body
  const T = createTwit()
  var data = {
    status: `@${screen_name} ${chat}`,
    in_reply_to_user_id:userid
  };

  T.post('statuses/update', data)
  .then(async (tweetData,err,response)=>{
    await Tweet.create({...tweetData.data})
    return res.json({tweetData:tweetData.data})
  })
  .catch(err=>res.json({message:err.message}))
})



export const server = app.listen(process.env['PORT'] || 3000,()=>console.log
("server started at 3000"));


import websocket from 'socket.io'
const io = websocket(server)
io.on('connection',()=>console.log('connection made'))

