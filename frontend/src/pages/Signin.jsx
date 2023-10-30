import { useState } from 'react'
import {Link }from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


export default function Signin() {
  const [formData, setFormData] = useState({})
  const[error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.id]: e.target.value,
    });

  };
  const handleSubmit = async (e) => {
     e.preventDefault();
     try{
     setLoading(true);
    const res = await fetch('/api/auth/signin', { 
     method:'POST',
     headers: {
     'Content-Type':'application/json',
     },
     body: JSON.stringify(formData),
   });
   const data = await res.json();
   console.log(data);
   if(data.success === false){
    setLoading(false);
    setError(data.message);
    
    return;
  
   }
   setLoading(false)
   setError(null);
   navigate('/')
  }catch (error){
    setLoading(false)
    setError(error.message);
  }
   
  };
 
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">  
        <input type="email" placeholder="Email" className="border p-3 rounded-lg id='username" id='email' onChange={handleChange}/>
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" id='password' onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-[orangered] p-3 rounded-lg font-bold uppercase hover:opacity-90
        disabled:opacity-80">{loading ? "Loading..." : "Signin"}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        
        <p>dont have an Account?</p>
        <Link to={'/signup'}>
          <span className='text-[blue]'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-[orangered] mt-5'>{error}</p>}
    </div>
  )
}