import { useSelector } from "react-redux"
import{ useRef, useState, useEffect } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase"

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser} = useSelector((state) => state.user)
  const[files, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  // console.log(formData)
  // console.log(filePercentage)
  // // console.log(files)

 

  useEffect(() => {
    if(files){
      handleFileUpload(files);
    }
  }, [files]);

  const handleFileUpload = (files) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + files.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, files);

    uploadTask.on('state_changed',(snapshot) => {
      const progress = (snapshot.bytesTransferred /
      snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done')
      setFilePercentage(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL) => 
        setFormData({...formData, avatar: downloadURL })
      );
    }
    );
  };
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-5'> 
      <input onChange={(e) => setFile(e.target.files[0])}
      type='file' accept='image/*' ref={fileRef} hidden/>
        <img onClick={() => fileRef.current.click()}
        src={formData.avatar || currentUser.avatar} alt='profile_pic' 
        className="rounded-full w-24 h-24 object-cover cursor-pointer mx-auto mt-2"/>
        <p className='text-sm self-center'>
          {fileUploadError ? 
          (<span className='text-[orangered]'>Error Image upload (Image must be less 2 mb)</span> )
          :
           filePercentage > 0 && filePercentage < 100 
        ? (<span className='text-slate-700'>{`Uploading ${filePercentage}%`}</span> )
        : filePercentage === 100 ? (<span className="text-[green]">Image Successfully Uploaded!!</span>)
       :
       ''
    }
        </p>
        <input type='text' placeholder="Username" className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder="Email" className='border p-3 rounded-lg' id='email'/>
        <input type='password' placeholder="Password" className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 rounded-lg p-3 text-[orangered] font-semibold uppercase hover:opacity-95
        disabled:opacity-80'>Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-[orangered] cursor-pointer">Delete Account</span>
        <span className="text-[orangered] cursor-pointer">Sign Out</span>
      
        
        </div>


    </div>
  )
}
 