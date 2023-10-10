'use client'
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { log } from 'console';

type Props = {}

const SignUpForm = (props: Props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const router = useRouter();

    const Register = () => {
        const data = {
            name: user.name,
            email: user.email,
            password: user.password
        }

        axios.post('/api/register', data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            router.push('/signin')
        })
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <div className='p-10 rounded-lg shadow-lg flex flex-col'>
                <h1 className='text-xl font-medium mb-4'>Sign Up</h1>

                <label htmlFor="name" className='mb-2'>Name</label>
                <input type="text" 
                className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
                id='name'
                value={user.name}
                placeholder='name'
                onChange={(e) => setUser({...user, name: e.target.value})}/>
                
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

                <button onClick={Register} className='p-2 bg-purple-600 rounded-lg  text-white border-gray-300 mt-2 mb-4 focus:outline hover:bg-purple-400 transition'>
                    Register Now
                </button>

                <Link href='/signin' className='text-sm text-center mt-5 text-neutral-600'>Already have an account?</Link>
                <Link href='/' className='text-sm text-center mt-2 text-neutral-600'>Home</Link>
            </div>
        </div>
    )
}

export default SignUpForm