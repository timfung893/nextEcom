'use client'
import React, {useState} from 'react';
import SearchBar from './SearchBar';
import Link from 'next/link';
import { CiShoppingCart } from 'react-icons/ci';
import { BsChevronCompactUp } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi'
import { signIn, signOut, useSession } from 'next-auth/react';

type Props = {}

const Navbar = (props: Props) => {
    const [showProfile, setShowProfile] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const {data:session} = useSession();
    console.log(session?.user);
    
    const SignOut = () => {
        if (session && session.user) {
            return (
                <ul className='py-5 px-1 text-neutral-600'>
                    <li className="hover:bg-gray-100 hover: text-neutral-900 px-5 py-2 cursor-pointer" >{session.user.name}</li>
                    <li className='whitespace-nowrap hover:bg-gray-100 hover: text-neutral-900 px-5 py-2 cursor-pointer'>
                        <a href="/addproduct">Add Product</a>
                    </li>        
                    <li onClick={() => { signOut()}} className='whitespace-nowrap hover:bg-gray-100 hover: text-neutral-900 px-5 py-2 cursor-pointer'>
                        Sign Out
                    </li>        
                </ul>
            )
        }
        return (
            <ul>
            <li onClick={() => { signIn()}} className='whitespace-nowrap hover:bg-gray-100 hover: text-neutral-900 px-5 py-2 cursor-pointer'>
                <a href="/signin">Sign In</a>
            </li>        
        </ul>
        )
    }
    return (
        <div>
            <div className='flex items-center justify-between py-4 relative'>
                <div className='flex items-center md:space-x-10 lg:space-x-20'>
                    <div className='font-semibold text-2xl'>
                        <a href="/">BRAND</a>
                    </div>
                    <nav className='max-md:hidden'>
                        <ul className='flex items-center lg:space-x-7 space-x-6 text-[15px]'>
                            <li><a href="/" className='py-3 inline-block w-full'>Shop</a></li>
                            <li><a href="/filters" className='py-3 inline-block w-full'>Filters</a></li>
                            {session?.user && (
                                <li><a href="/myproducts" className='py-3 inline-block w-full'>My Products</a></li>
                            )}
                        </ul>
                    </nav>
                </div>
                <div className='flex items-center space-x-4'>
                    <SearchBar/>
                    <div onClick={() => setShowProfile(!showProfile)} className='relative cursor-pointer'>
                        <img src="user.jpg" alt="user image" className='w-[35px] h-[35px] rounded-full object-cover'/>
                        <div className={`absolute bg-white z-[2] rounded-lg shadow-lg ${showProfile ? '' : 'hidden'}`}>
                           <SignOut/>
                        </div>
                    </div>
                    <Link href='/cart'>
                        <div className='p-2 bg-gray-100 rounded-full'><CiShoppingCart size={20}/></div>
                    </Link>
                    <span onClick={() => {setShowNav(!showNav)}} className='p-[9px] bg-gray-100 rounded-full md:hidden'>
                        <BsChevronCompactUp className={`transition ease-in duration-150 ${showNav ? 'rotate-180' : '0'}`}/>
                    </span>
                </div>
            </div>
            <div className={`md:hidden ${showNav ? 'pb-4 px-5' : 'h-0 invisible opacity-0'}`}>
                <ul className='flex flex-col px-2 opacity-75 text-[15px]'>
                    <li><a href="/" className='py-3 inline-block w-full'>Shop</a></li>
                    <li><a href="/filters" className='py-3 inline-block w-full'>Filters</a></li>
                    <li><a href="/myproducts" className='py-3 inline-block w-full'>My Products</a></li>
                </ul>
                <div className='flex items-center bg-gray-100 p-2 rounded-lg '>
                    <input
                        type="text"
                        className='w-full outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]'
                        autoComplete='off'
                        placeholder='Search'
                    />
                    <button><BiSearch size={20} className='opacity-50'/></button>
                </div>
            </div>
        </div>
    )
}

export default Navbar