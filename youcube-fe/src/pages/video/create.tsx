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
    <div className='mt-16 p-6'>
      <h1>Create Video</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="url">Video URL</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateVideo;
