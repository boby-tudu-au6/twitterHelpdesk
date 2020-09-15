import React,{useState,useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faIdCard, faUsers, faHome, faCog, faUniversity, faGem} from '@fortawesome/free-solid-svg-icons'
import {faComments, faClock, } from '@fortawesome/free-regular-svg-icons'
import './style/styles.css'
import io from 'socket.io-client'
import { baseurl } from '../redux/actions/action'
import {connect} from 'react-redux'
// profile_image_url_https

function Nav({userdata}) {
    // console.log(userdata)
    const [socket, setSocket] = useState(null)
    useEffect(()=>{
        if(socket===null){
            setSocket(io('http://localhost:3000'))
        }
    },[])



    return (
        <div className="col-1 p-0 bg-light text-center" style={{maxWidth:"90px"}}>
        <div className="p-3 pl-4 text-center row m-auto col-12 justify-content-between">
            <div className="rounded-circle bg-danger" style={{padding:'6px'}}></div>
            <div className="rounded-circle bg-warning" style={{padding:'6px'}}></div>
            <div className="rounded-circle bg-success" style={{padding:'6px'}}></div>
        </div>
        <div className="col-12 p-0 text-center mb-2" style={{fontSize:"35px"}}>
        <FontAwesomeIcon icon={faGem} className='ml-2 text-danger' />
        </div>
        <div className="col-12 m-auto text-center p-0 mb-2">
            <div className="col-12 p-2 text-center icon" style={{fontSize:"22px"}}>
                <FontAwesomeIcon icon={faClock} className='ml-2' />
            </div>
            <div className="col-12 p-2 text-center icon" style={{fontSize:"22px"}}>
                <FontAwesomeIcon icon={faHome} className='ml-2' />
            </div>
            <div className="col-12 p-2 text-center icon" style={{fontSize:"22px"}}>
                <FontAwesomeIcon icon={faUsers} className='ml-2' />
            </div>
            <div className="col-12 p-2 text-center icon" style={{fontSize:"22px"}}>
                <FontAwesomeIcon icon={faComments} className='ml-2' />
            </div>
            <div className="col-12 p-2 text-center icon" style={{fontSize:"22px"}}>
                <FontAwesomeIcon icon={faIdCard} className='ml-2' />
            </div>
            <div className="col-12 p-2 text-center icon" style={{fontSize:"27px"}}>
                <FontAwesomeIcon icon={faUniversity} className='ml-2' />
            </div>
        </div>
        <div className="col-12 text-center p-0" style={{marginTop:"5%"}}>
            <div className="col-12 p-2 text-center icon" style={{fontSize:"27px"}}>
                <FontAwesomeIcon icon={faCog} className='ml-2' />
            </div>
            <div className="col-12 p-2 text-center pl-3 icon" style={{fontSize:"27px"}}>
            <img className="col-12 rounded-circle m-auto" 
            src={userdata.profile.profile.profile_image_url_https} alt='img' style={{width:"90%"}} />
            </div>
        </div>
    </div>
    )
}

export default connect(state=>{return {...state}})(Nav)
