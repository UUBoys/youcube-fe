import Thumbnail from '@/modules/common/components/Thumbnail';
import { GetVideoMutation, GetVideosMutation } from '@/modules/mutations/VideoMutations';
import { useRouter } from 'next/router';
import React from 'react'

const Video = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: video, isLoading, error } = (id && id !== 'undefined')
    ? GetVideoMutation(typeof id === 'string' ? id : id[0])
    : { data: null, isLoading: true, error: null };


  if (isLoading) return (
    <div>Loading...</div>
  )

  if (video) return (
    <div className='w-full h-full min-h-screen mt-16 bg-white text-gray-600'>
      <div className='flex w-full h-screen flex-row'>
        <div className='h-screen w-full'>
          <iframe
            width="75%"
            height="70%"
            src={`${video.url}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            className="rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h1 className='text-4xl p-3'>{video.title}</h1>
          <hr className='w-3/4' />
          <p className='p-3'>
            {video.description}
          </p>
        </div>
      </div>

    </div>
  )

  return (
    <div></div>
  )
}

export default Video
