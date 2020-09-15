import React from 'react'

function Chats({item}) {
    return (
        <div className='col-12 row ml-auto mr-auto mb-2 bg-light rounded'>
            <div className='col-1 mt-1 p-0'>
                <img src={item.user.profile_image_url_https} alt="img" width='80%' className='rounded-circle p-0'/>
            </div>
            <div className='col-7'>
                <h6 className='p-0 m-0 font12'>{item.user.name}</h6>
                <p className='p-0 m-0 font12 text-secondary'>{item.text}</p>
            </div>
            <div className='col-4 text-right p-0'>
                <p className='text-secondary font9'>{item.created_at.slice(0,-10)}</p>
            </div>
        </div>
    )
}

export default Chats
