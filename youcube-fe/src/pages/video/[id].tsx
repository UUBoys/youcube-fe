import { GetVideoMutation } from '@/modules/mutations/VideoMutations';
import { useRouter } from 'next/router';
import React from 'react'

const Video = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: video, isLoading, error } = (id && id !== 'undefined')
    ? GetVideoMutation(typeof id === 'string' ? id : id[0])
    : { data: null, isLoading: true, error: null };

  console.log(video)
  if (isLoading) return (
    <div>Loading...</div>
  )

  if (video) return (
    <div className='w-full h-full min-h-screen mt-16 bg-white'>
      <h1>{video.title}</h1>
      <div className='h-screen'>
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
      </div>
    </div>
  )

  return (
    <div></div>
  )
}

export default Video
