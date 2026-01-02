import React, {useState} from 'react'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
    }
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max:md-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full py-6 text-center'>
                <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span> Login</h1>
                <p className='font-light'>Please enter your credentials</p>
            </div>
            <form onSubmit={handleSubmit} className='w-full mt-6 sm:max-w-md text-gray-600'>

                <div className='flex flex-col'>
                    <label>Email</label>
                    <input onChange={e=>setEmail(e.target.value)} value={email}
                    type="email" placeholder='Enter your email' className='border-b-2 border-gray-300 p-2 outline-none mb-6' required />
                </div>
                <div className='flex flex-col'>
                    <label>Password</label>
                    <input onChange={e=>setPassword(e.target.value)} value={password}
                    type="password" placeholder='Enter your password' className='border-b-2 border-gray-300 p-2 outline-none mb-6' required />
                </div>
                <button type='submit' className='w-full font-medium bg-primary text-white py-2 rounded-full mt-4 cursor-pointer hover:bg-primary/90 duration-300'>Login</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
