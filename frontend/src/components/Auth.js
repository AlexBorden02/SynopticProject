import Cookies from 'js-cookie';
import { useState, useEffect, React } from 'react'


const checkAuth = async() => {

    return await fetch('http://localhost:4000/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: Cookies.get('token')})
        }).then(x => x.json()).then(y => y.authed)

    
}

export default checkAuth
