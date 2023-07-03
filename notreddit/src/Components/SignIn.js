import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firestore';
import { NavLink, useNavigate } from 'react-router-dom'
import HeaderSignup from './HeaderSignup';
import { Link } from 'react-router-dom';
 
export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
      
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      navigate("/")
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }
 
  return(
    <main className='flex flex-col items-center h-screen bg-stone-50'>    
      <HeaderSignup/>
      <div className='flex flex-col items-center justify-center flex-1'>
        <section className='flex flex-col items-center justify-center gap-8'>
          <div className="flex flex-col p-4 items-center w-[40rem] rounded-md border bg-white cursor-pointer shadow-md hover:shadow-lg transition-all">                                                               
            <form className='flex flex-col gap-8 items-center justify-center p-8'>
              <div className='flex flex-col gap-4'>                                   
                <div className='grid grid-cols-3'>
                  <label className='col-span-1 text-gray-500' htmlFor="email-address">
                    Email address
                  </label>
                  <input className="bg-stone-50 rounded-full shadow-inner h-8 w-[20rem] px-4 focus:outline-none focus:outline-lime-500 focus:bg-stone-100 transition-all hover:bg-stone-100 col-span-2" id="email-address" name="email" type="email" required placeholder="Email address" onChange={ (e)=>setEmail(e.target.value) }/>
                </div>
                <div className='grid grid-cols-3'>
                  <label className='col-span-1 text-gray-500' htmlFor="password">
                    Password
                  </label>
                  <input className="bg-stone-50 rounded-full shadow-inner h-8 w-[20rem] px-4 focus:outline-none focus:outline-lime-500 focus:bg-stone-100 transition-all hover:bg-stone-100 col-span-2" id="password" name="password" type="password" required placeholder="Password" onChange={ (e)=>setPassword(e.target.value) }/>
                </div>               
              </div>   
              <button className="bg-lime-500 hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[6rem] h-[2.5rem] rounded-xl transition-all" onClick={ onLogin }>      
                  Login                                                                  
                </button>                         
            </form>                
          </div>
          <div className='flex flex-col items-center w-[20rem] justify-center gap-4 p-8 rounded-md shadow-lg hover:shadow-xl transition-all border text-gray-500'>
            No account yet? {' '}
            <Link to="/signup" >
              <button className="bg-lime-500 hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[6rem] h-[2.5rem] rounded-xl transition-all" >
                Sign up
              </button>
            </Link>
          </div>  
        </section>
      </div>
    </main>
  )
}