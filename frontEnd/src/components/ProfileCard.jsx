import React from 'react'
import Axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons'
import { baseurl } from '../redux/actions/action'
import {connect} from 'react-redux'

function ProfileCard({profile_image_url_https,name, curUser}) {

    return (
        <div className="col-3 p-0 text-center pb-5 border border-left-0 border-dark" 
        style={{height:"70vh", overflowY:"scroll", borderRadius:"0px 7px 7px 0px"}}>
            <div className="col-12 p-0 pt-3 mb-4">
                <img className="col-6 rounded-circle m-auto" 
                src={profile_image_url_https} alt='img' />
            </div>
                <h5 className="m-0">{name}</h5>
            <p className="m-0 p-1 pl-3 pr-3 rounded-pill d-inline-block m-auto bg-light text-success">
                online
            </p>
            <div className="row m-auto col-12 p-0 pl-4 pr-4 pt-3">
                <button className="btn btn-sm m-auto rounded-pill" 
                style={{backgroundColor:"#dcdcdc"}}>
                    
                    <FontAwesomeIcon icon={faPhone} />&nbsp;Call
                    </button>
                    <button className="btn btn-sm m-auto rounded-pill" 
                    style={{backgroundColor:"#e4e4e4"}}>
                        <FontAwesomeIcon icon={faEnvelopeOpen} />&nbsp;Email</button>
                    </div>
            <div
                className="p-2 row m-auto text-secondary">
                <div className="col-6 text-left pl-2">
                    <p className="m-0 p-0 font12">Room</p>
                    <p className="m-0 p-0 font12">Category</p>
                    <p className="m-0 p-0 font12">Country</p>
                </div>
                <div className="col-6 text-right pr-2">
                    <p className="m-0 p-0 font12"><strong>102</strong></p>
                    <p className="m-0 p-0 font12"><strong>Standard</strong></p>
                    <p className="m-0 p-0 font12"><strong>Unknown</strong></p>
                </div>
        </div>
    </div>
    )
}

export default connect(state=>{return {...state}})(ProfileCard)
