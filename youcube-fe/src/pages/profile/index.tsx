import { useUserSessionContext } from '@/modules/contexts/userContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Profile = () => {
  const user = useUserSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.user) router.push('/login');
  }, [user])

  const logout = () => {
    router.push('/auth/signin');
  }

  const uploadVideo = () => {
    router.push('/video/create');
  }

  return (
    <div className='pt-16 p-6 h-screen bg-white w-full flex flex-col justify-center items-center text-black'>
      <h2 className='text-3xl mb-3'>Profile - {user?.user?.name}</h2>
      <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={logout}>Logout</button>
      <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={uploadVideo}>Upload video</button>

    </div>

  )
}

export default Profile
