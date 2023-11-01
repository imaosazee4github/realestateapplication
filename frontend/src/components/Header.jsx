import {CiSearch} from 'react-icons/ci'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-slate-500 shadow-orange-50'>
        <div className='flex justify-between items-center max-w-6xl p-3 mx-auto'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap '>
       <span className='cursor-pointer'>Real</span>
        <span className='text-[orangered] cursor-pointer'>Estate</span>
        </h1>
        </Link>
        <form className='bg-slate-200 p-3 rounded-lg flex items-center' >
            <input type='text' placeholder='Search' 
            className='bg-transparent focus:outline-none w-24 sm:w-64' />
            <CiSearch className=' text-slate-700'/>
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li className='hidden sm:inline text-[orangeRed] hover:underline font-bold'>Home</li>
            </Link>
            <Link to='/About'>
            <li className='hidden sm:inline text-[orangered] hover:underline font-bold'>About</li> 
            </Link>

            <Link to='/profile'>
              {currentUser ? (
                <img className='rounded-full w-7 h-7 object-cover' src={currentUser.avatar} alt='profile' />
              ):
            <li className='sm:inline text-[orangered] hover:underline font-bold'>SignIn</li> }
            </Link>
          
        </ul>
        </div>
        
    </header>
  )
}