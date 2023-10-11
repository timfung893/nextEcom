import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react'
import Link from 'next/link';

type Props = {}

const SignInForm = (props: Props) => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const Login = () => {
        try {
            signIn('credentials', {
                email: user.email,
                password: user.password,
                redirect: true,
                callbackUrl: '/'
            })
        } catch (error) {
            console.log('Error signing in');
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <div className='p-10 rounded-lg shadow-lg flex flex-col'>
                <h1 className='text-xl font-medium mb-4'>Sign In</h1>
                
                <label htmlFor="email" className='mb-2'>Email</label>
                <input type="text" 
                className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
                id='email'
                value={user.email}
                placeholder='email'
                onChange={(e) => setUser({...user, email: e.target.value})}/>

                <label htmlFor="password" className='mb-2'>Password</label>
                <input type="password" 
                className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
                id='name'
                value={user.password}
                placeholder='password'
                onChange={(e) => setUser({...user, password: e.target.value})}/>

                <button onClick={Login} className='p-2 bg-purple-600 rounded-lg  text-white border-gray-300 mt-2 mb-4 focus:outline hover:bg-purple-400 transition'>
                    Login Now
                </button>

                <Link href='/signup' className='text-sm text-center mt-5 text-neutral-600 hover:bg-gray-200 rounded-lg transition'>Do not have an account?</Link>
                <Link href='/' className='text-sm text-center mt-2 text-neutral-600 hover:bg-gray-200 rounded-lg transition'>Home</Link>
            </div>
        </div>
    )
}

export default SignInForm