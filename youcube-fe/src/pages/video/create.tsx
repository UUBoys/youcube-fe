import React, { useState } from 'react';
import { useUserSessionContext } from '@/modules/contexts/userContext';
import { VideoMutation } from '@/modules/mutations/VideoMutations';

const CreateVideo = () => {
  const user = useUserSessionContext();

  const { mutateAsync } = VideoMutation();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const onClick = async () => {
    if (!user || !user.jwt) return;
    const res = await mutateAsync({
      video: { description: description, title: title, url: url, monetized: false, tag: 0 },
      token: user.jwt,
    });
    console.log(res);
  };

  return (
    <div className='pt-16 p-6 h-screen bg-white w-full flex flex-col justify-center items-center text-black'>
      <h2 className='text-3xl mb-3'>Upload Video</h2>
      <form
        className='w-full lg:w-1/2'
        onSubmit={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <div className="mb-6 w-[50%]">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Video title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Video description" onChange={(e) => setDescription(e.target.value)} value={description} />
        </div>
        <div className="mb-6">
          <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Url</label>
          <input id="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Video URL" onChange={(e) => setUrl(e.target.value)} value={url} />
        </div>
        <button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Upload!</button>

      </form>
    </div>
  );
};

export default CreateVideo;
