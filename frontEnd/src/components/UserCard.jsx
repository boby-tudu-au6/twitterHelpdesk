import React from 'react'
import {connect} from 'react-redux'
import { getChat, setProfile } from '../redux/actions/action'

function UserCard({item,userdata,getChat, setProfile}) {

    function getProfile(){
        let profile = userdata.followers.map(elem=>{
            if(elem.id===item.id){
                return elem
            }
        })
        profile = profile[0]
        setProfile(profile)
        getChat({from:item.id,to:userdata.profile.profile.id})
    }
    return (
        <div className="col-12 border border-dark p-2 row 
        ml-auto mr-auto mb-3" 
        style={{borderRadius:"7px", cursor:"pointer"}} 
        onClick={getProfile}>
        <div className="col-3 p-0">
            <img className="p-0 rounded-circle" 
            style={{width:"80%"}} 
            src={item.profile_image_url_https} 
            alt='img'/>
        </div>
        <div className="col-9">
            <h6 className='p-0 m-0'>{item.name}</h6>
            <p className='text-secondary p-0 m-0'>{item.screen_name}</p>
        </div>
    </div>
    )
}
const mapDispatchToProps = dispatch =>{
    return {
        getChat:payload=>dispatch(getChat(payload)),
        setProfile:payload=>dispatch(setProfile(payload))
    }
}
export default connect(state=>{return {...state}},mapDispatchToProps)(UserCard)
