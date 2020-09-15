import React,{useState,useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import './style/styles.css'
import Axios from 'axios'
import {connect} from 'react-redux'
import { doLogin } from '../redux/actions/action'

function Login({fun,doLogin}) {
    // function openPopup(){
    //     Axios.get('http://127.0.0.1:3000/test')
    //     .then(({data})=>console.log(data))
    //     .catch(err=>console.log(err.message))
    // }

    useEffect(()=>{
        doLogin()
        
    },[])
    return (
        <div className='container text-center pt-5'>
            <button 
            onClick={()=>window.open("http://127.0.0.1:3000",'_self')} 
            className='btn btn-lg btn-outline-primary rounded rounded-pill loginBtn mt-5'>
                <FontAwesomeIcon icon={faTwitter} /> 
                Login with Twitter
            </button>
            {/* <TwitterLogin
            authCallback={(err,data)=>console.log(err,data)}
            consumerKey='JAABlOt9wzw9dyr8SASkPjRrj'
            consumerSecret='ki0m1aFKtdYisdalDQUOHnfOS0EI5XC1Iez1xbhx0Htox2NwrI'
            callbackUrl='http://127.0.0.1:3000'
    /> */}
        </div>
    )
}

const mapDispatchToAction = dispatch =>{
    return {
        doLogin:()=>dispatch(doLogin())
    }
}
export default connect(state=>{return {...state}},mapDispatchToAction)(Login)
