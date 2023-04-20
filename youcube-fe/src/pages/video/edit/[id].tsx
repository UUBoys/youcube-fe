/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

import { useUserSessionContext } from "@/modules/contexts/userContext";
import { VideoMutation } from "@/modules/mutations/VideoMutations";
import { GetTagsQuery } from "@/modules/queries/TagsQuery";
import { GetVideoQuery } from "@/modules/queries/VideoQuery";

const CreateVideo = () => {
  const user = useUserSessionContext();
  const router = useRouter();
  const { mutateAsync, isError, error, isSuccess, isLoading } = VideoMutation();

  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const { data: tags } = GetTagsQuery();
  const { data: video } = GetVideoQuery(router.query.id as string);

  useEffect(() => {
    if (video) {
      // if (video?.users?.uuid !== user?.uuid) {
      //   alert("Nemáte právo upravovat toto video")
      //   router.push('/')
      // }
      setTitle(video.title);
      setTag(video.tag ?? 0);
      setDescription(video.description);
      setUrl(video.url);
    }
    if (video && video.error) {
      alert(video.error);
      router.push("/");
    }
  }, [video, user]);

  useEffect(() => {
    if (isError) {
      toast("Došlo k chybě", {
        type: "error",
      });
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast("Video bylo úspěšně upraveno", {
        type: "success",
      });
      router.push("/");
    }
  }, [isSuccess, router]);

  const onClick = async () => {
    if (!user || !user.jwt) return;
    await mutateAsync({
      video: {
        comments: [],
        description,
        title,
        url,
        monetized: false,
        tag,
      },
      token: user.jwt,
    });
  };
  return (
    // @ts-ignore broken definition of LoadingOverlay
    <LoadingOverlay
      className="h-screen w-full"
      spinner
      active={isLoading}
      text="Načítání..."
    >
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white p-6 pt-16 text-black">
        <form
          className="w-full rounded-xl bg-white px-3 py-4 shadow-[0px_7px_29px_0px_rgba(0,0,0,0.1)] lg:w-1/2"
          onSubmit={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          <h2 className="mb-3 text-center text-3xl">Upload Video</h2>
          <div className="mb-6 ">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-0 placeholder:text-gray-600 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-red-500 dark:focus:ring-red-500"
              placeholder="Video title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Tag
            </label>
            <select
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-0 placeholder:text-gray-600 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-red-500 dark:focus:ring-red-500"
              onChange={(e) => setTag(parseFloat(e.target.value))}
              value={tag}
            >
              {tags &&
                tags?.map((option: any) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              className="block h-36 w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-0 placeholder:text-gray-600 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
              placeholder="Video description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="url"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Url
            </label>
            <input
              id="url"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-0 placeholder:text-gray-600 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
              placeholder="Video URL"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
          </div>
          <div className="flex w-full items-center justify-center">
            <button
              type="submit"
              className="mr-2 mb-2 w-40 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </LoadingOverlay>
  );
};

export default CreateVideo;
