import { DO_LOGIN, GET_CHAT, SET_PROFILE, POST_STATUS } from "../actions/action"

const initState = {
    userdata:null,
    curUser:null,
    chats:null
}

function rootReducer(state=initState,action){
    const {type,payload} = action
    switch(type){
        case DO_LOGIN:return {...state,userdata:payload}
        case GET_CHAT:return {...state,chats:payload}
        case SET_PROFILE:return {...state,curUser:payload}
        case POST_STATUS:return {...state,chats:[...state.chats, payload]}
        default:return {...state}
    }
}

export default rootReducer 