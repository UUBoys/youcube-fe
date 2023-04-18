import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

import { useUserSessionContext } from "@/modules/contexts/userContext";
import { VideoMutation } from "@/modules/mutations/VideoMutations";

const CreateVideo = () => {
  const user = useUserSessionContext();
  const router = useRouter();
  const { mutateAsync, isError, error, isSuccess, isLoading } = VideoMutation();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (isError) {
      toast("Došlo k chybě", {
        type: "error",
      });
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast("Video bylo úspěšně nahráno", {
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
        tag: 0,
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
        <h2 className="mb-3 text-3xl">Upload Video</h2>
        <form
          className="w-full lg:w-1/2"
          onSubmit={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          <div className="mb-6 w-[50%]">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-600 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-red-500 dark:focus:ring-red-500"
              placeholder="Video title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
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
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-600 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
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
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-600 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
              placeholder="Video URL"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
          </div>
          <button
            type="submit"
            className="mr-2 mb-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Upload!
          </button>
        </form>
      </div>
    </LoadingOverlay>
  );
};

export default CreateVideo;
