import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import logo from '../logos/StylishYou_Logo_Main.png';

async function loginUser(credentials) {
    return fetch("http://localhost:4000/api/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      
}


const Login = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [inputValue, setInputValue] = useState("");
    const [msg, setMsg] = useState()

    const handleSubmit = async e => {
        const res = await loginUser({
            name: username.toLowerCase(),
            password: password
        })
        if(res.token === undefined){
            setMsg("Incorrect username or password")
        }
        if(res.token){
            Cookies.set('token', res.token)
            return window.location.href=`/`
        }
    }

    const resetInputField = () => {
        setInputValue("");
    };

    return (
        <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
            <div class="bg-white w-96 shadow-xl rounded p-5">
                <div className="max-w-md w-full space-y-8">
                    <img src={logo} alt="" className='pb-5 max-h-20'/>
                    <h1 className="mt-6 items-center text-center text-3xl text-gray-900 font-bold">
                        StylishYou Stock Management
                    </h1>
                    <h2 className="mt-6 text-center text-3xl text-gray-900 font-bold">Sign in</h2>
                    <form className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="user"
                                    name="user"
                                    type="user"
                                    autoComplete="user"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                    onChange={e => setUserName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div class=' text-red-600 text-center'>
                                {msg}
                            </div>
                        </div>
                    </form>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => handleSubmit()}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
