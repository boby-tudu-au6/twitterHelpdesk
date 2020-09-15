import Axios from 'axios'
export const DO_REGISTER = 'DO_REGISTER'
export const DO_LOGIN = 'DO_LOGIN'
export const GET_CHAT = 'GET_CHAT'
export const SET_PROFILE = 'SET_PROFILE'
export const POST_STATUS = 'POST_STATUS'
export const baseurl = `http://localhost:3000`


export const doLogin = () => async dispatch =>{
    try{
        const {data} = await Axios.get("http://localhost:3000/auth")
        if(data.userData.profile!==undefined){
            return dispatch({
                type:DO_LOGIN,
                payload:{profile:data.userData,followers:data.followers}
            })
        }
        
    }catch(err){
        console.log(err.message)
    }
}


// export const checkLogin = () => async dispatch =>{
//     try{
//         const user = localStorage.getItem("user")
//         if(user!==null){
//             const {data} = await Axios.post(`${baseurl}/check`,{
//                 token:user
//             })
//         }
//     }catch(err){
//         console.log("error")
//     }
// }

export const setProfile = payload => dispatch =>{
    return dispatch({
        type:SET_PROFILE,
        payload:{...payload}
    })
}

export const getChat = ({from,to}) => async dispatch =>{
    try{
        const {data} = await Axios.post(`${baseurl}/getchat`,{from,to})
        return dispatch({
            type:GET_CHAT,
            payload:data.chats
        })
    }catch(err){
        console.log(err.message)
    }
}

export const postStaus = ({userid,screen_name, chat}) => async dispatch =>{
    try{
        const {data} = await Axios.post(`${baseurl}/poststatus`,{screen_name, userid, chat})
        return dispatch({
            type:POST_STATUS,
            payload:data.tweetData
        })
    }catch(err){
        console.log(err.message)
    }
}