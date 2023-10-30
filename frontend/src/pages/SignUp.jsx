import { useState } from 'react'
import {Link }from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.id]: e.target.value,
    });

  };
  const handleSubmit = async (e) => {
     e.preventDefault();
    const res = await fetch('/api/auth/signup', { 
     method:'POST',
     headers: {
     'Content-Type':'application/json',
     },
     body: JSON.stringify(formData),
   });
   const data = await res.json();
   console.log(data);

  }
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">  
        <input type="text" placeholder="Username" className="border p-3 rounded-lg id='username" id="username" onChange={handleChange}/>
        <input type="email" placeholder="Email" className="border p-3 rounded-lg id='username" id='email' onChange={handleChange}/>
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" id='password' onChange={handleChange}/>
        <button className="bg-slate-700 text-[orangered] p-3 rounded-lg font-bold uppercase hover:opacity-90
        disabled:opacity-80">SignUp</button>
      </form>
      <div className='flex gap-2 mt-5'>
        
        <p>Have an Account?</p>
        <Link to={'/signin'}>
          <span className='text-[blue]'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

