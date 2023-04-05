import { GetVideoMutation } from '@/modules/mutations/VideoMutations';
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

  console.log(video)

  if (video && video[0]) return (
    <div className='w-full h-full min-h-screen mt-16 bg-white'>
      <h1>{video[0].title}</h1>
      <div className='h-screen'>
        <iframe
          width="75%"
          height="70%"
          src={`${video[0].url}?autoplay=1`}
          title={video[0].title}
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
