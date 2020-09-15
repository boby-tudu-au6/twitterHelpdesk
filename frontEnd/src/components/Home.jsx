import React,{useState,useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilter, faCircle,  faPaperclip} from '@fortawesome/free-solid-svg-icons'
import UserCard from './UserCard'
import ProfileCard from './ProfileCard'
import {connect} from 'react-redux'
import Chats from './Chats'
import { postStaus } from '../redux/actions/action'

function Home({userdata,chats, curUser, postStatus}) {
    const [chat, setChat] = useState('')
    // useEffect(()=>{
    // },[chat])
    function sendUpdate(e){
        e.preventDefault()
        postStatus({userid:curUser.id, screen_name:curUser.screen_name, chat})
    }
    return (
        <div className="col pl-5 pr-5" style={{height:"100vh"}}>
        <div className="row m-auto p-0 col-12" style={{height:"10vh"}}>
            <div className="col-8 pl-5 pt-3">
                <h5 className="text-secondary">Updates</h5>
            </div>
            <div className="col-4 pt-3">
                <p className="text-secondary d-inline-block mr-4">
                    Session 34min
                </p>
                <p className="text-secondary d-inline-block">
                    User: {userdata.profile.profile.name}
                </p>
            </div>
        </div>
        <div className="mt-5" style={{height:"82vh"}}>
            <div className="row m-auto col-12 p-0 pl-5" style={{height:"8vh"}}>
                <h3 className="mr-3">Conversations</h3>
                <input className="form-control-sm rounded-pill 
                border bg-light pl-3 mr-3 shadow-sm pt-0 border-0" type="text" placeholder="search"/>
                <div>
                    <div className='p-1 pl-3 pr-3 rounded-pill bg-light shadow-sm'>
                        <FontAwesomeIcon icon={faFilter} />  Filter
                    </div>
                </div>
                <div className='ml-auto mr-5'>
                   <div className="rounded-pill bg-light shadow-sm row p-1 pl-2 pr-2">
                        <FontAwesomeIcon icon={faCircle} 
                        className="fa fa-circle text-success mr-2 p-0 m-0 mt-1" />
                    <p className="p-0 m-0">online</p>
                    </div> 
                </div>
        </div>
        <div className="row col-12 m-auto pt-4" style={{height:"74vh"}}>
            <div className="col-3 pb-5" style={{height:"70vh",overflowY:"scroll"}}>
                {userdata.followers!==undefined?
                userdata.followers.map(item=><UserCard key={item.id} item={item} />):
                null}               
            </div>
            {/* here overflowY was hidden */}
            {curUser!==null?
            <><div className="col-6 p-0 border border-dark" style={{
                borderRadius:"7px 0px 0px 7px", overflowY:'scroll'
            }}>
                <div 
                className="col-12 border-bottom pt-1 row m-auto pb-0" 
                style={{height:"7vh"}}>
                    <div className="col-1 p-0">
                        <img className="p-0 rounded-circle" 
                        style={{width:"80%"}} 
                        src={curUser.profile_image_url_https} alt='img'/>
                    </div>
                    <div className="row justify-content-between col-11 p-0">
                        <h6 className="mt-1 ml-3 mr-3">{curUser.name}</h6>
                        <FontAwesomeIcon 
                        icon={faCircle}
                        className='text-success mt-2 font12'/>
                        <p className="mt-1 text-secondary ml-3 font12">Room:102</p>
                        <p className="mt-1 text-secondary ml-3 font12">Oct12-Oct12</p>
                        <div className="ml-auto row">
                            <p className="p-1 rounded-pill pl-2 pr-2 font12" style={{backgroundColor:"#dddddd"}}>Create task</p>
                        </div>
                    </div>
                </div>
                <div id="message_box" className="col-12 p-0" style={{height:"62vh"}}>
                    <div className="col-12" style={{height:"53vh", overflowY:"scroll"}}>
                        {/* this is message box */}
                        {chats!==null?
                        chats.map(item=><Chats key={item._id} item={item}/>):null}
                    </div>
                    <div className="col-12 row m-auto" 
                    style={{height:"8vh"}}>
                        <div className='col-1 p-0 mt-1'>
                        <img className="p-0 rounded-circle" 
                        style={{width:"35px", height:"35px"}} 
                        src={userdata.profile.profile.profile_image_url_https} alt='img'/>
                        </div>
                        <div className='col-11 p-2'>
                            <div className='border border-secondary pb-1 row m-auto' 
                            style={{borderRadius:"7px"}}>
                                <form className='col-11 p-0' method='post' onSubmit={sendUpdate}>
                                    <input type="text" name="chat" className='border-0 col-12'
                                    style={{backgroundColor:"transparent"}} onChange={(e)=>setChat(e.target.value)}/>
                                </form>
                                <FontAwesomeIcon icon={faPaperclip} className='text-secondary mt-2 ml-auto mr-auto' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileCard 
            profile_image_url_https={curUser.profile_image_url_https} 
            name={curUser.name}/></>:null}
    </div>
</div>
</div>
    )
}

const mapDispatchToProps = dispatch =>{
    return {
        postStatus:payload=>dispatch(postStaus(payload))
    }
}

export default connect(state=>{return {...state}}, mapDispatchToProps)(Home)
