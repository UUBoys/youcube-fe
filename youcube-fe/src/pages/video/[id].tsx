/* eslint-disable import/named */
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";

import Thumbnail from "@/modules/common/components/Thumbnail";
import VideoLoading from "@/modules/common/components/VideoLoading";
import { useUserSessionContext } from "@/modules/contexts/userContext";
import { CreateCommentMutation } from "@/modules/mutations/CommentMutation";
import { GetVideoQuery, GetVideosQuery } from "@/modules/queries/VideoQuery";

interface ICommentVideoForm {
  comment: string;
}

export const Video = () => {
  const router = useRouter();
  const user = useUserSessionContext();
  const { mutateAsync: mutateAsyncCreateComment } = CreateCommentMutation();
  const { register, handleSubmit, reset } = useForm<ICommentVideoForm>();
  const { id } = router.query;

  const { data: video, refetch: refetchVideo } = GetVideoQuery(id as string);

  const { data: videos } = GetVideosQuery();

  const handleCommentSendSubmit = async (data: ICommentVideoForm) => {
    if (!user || !user.jwt) return;
    await mutateAsyncCreateComment({
      message: data.comment,
      video_uuid: id as string,
    });
    refetchVideo();
    reset();
  };

  const getYouTubeLikeDate = (uploadDate: Date): string => {
    const now = new Date();
    const diffInMillis = now.getTime() - uploadDate.getTime();

    const MINUTE = 60 * 1000;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;

    if (diffInMillis < MINUTE) {
      return "a minute ago";
    }
    if (diffInMillis < HOUR) {
      const minutes = Math.floor(diffInMillis / MINUTE);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    if (diffInMillis < DAY) {
      const hours = Math.floor(diffInMillis / HOUR);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    if (diffInMillis < MONTH) {
      const days = Math.floor(diffInMillis / DAY);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
    if (diffInMillis < YEAR) {
      const months = Math.floor(diffInMillis / MONTH);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }
    return uploadDate.toLocaleDateString();
  };

  const getComments = (): JSX.Element[] => {
    if (!video || !video.comments) return [];
    return video.comments.map((comment, index) => {
      return (
        <div className="flex flex-row items-center gap-5 p-5">
          <PersonIcon height={100} width={100} />
          <div className="flex flex-col">
            <div className="text-[10px] text-gray-400">
              <p>{comment.users.name}</p>
            </div>
            <div className="flex ">
              <p>{comment.message}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const getVideos = useMemo((): JSX.Element[] => {
    if (!videos || !Array.isArray(videos))
      return [...Array(30)].map((_, i) => (
        <VideoLoading additionalStyles={i === 0 ? "pl-3 pt-3" : undefined} />
      ));

    return videos.map((videoPar, i) => {
      return (
        <Thumbnail
          video={videoPar}
          additionalStyles={i === 0 ? "pl-3 pt-3" : undefined}
        />
      );
    });
  }, [videos]);

  if (video)
    return (
      <div className="mt-16 h-full min-h-screen w-full bg-white pr-20 pl-10 text-gray-600">
        <div className="flex h-screen w-full flex-row">
          <div className="h-screen w-4/5">
            <iframe
              width="100%"
              height="70%"
              src={`${video.url}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              className="rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <h1 className="p-3 text-4xl">{video.title}</h1>
            <hr className="w-3/4" />
            <h1 className="ml-3 p-3 text-lg font-semibold text-gray-400">
              {getYouTubeLikeDate(new Date(video.created))}
            </h1>
            <div className="flex flex-row px-5 pb-5">
              <div className="h-[51px] w-[51px] items-center rounded-full border bg-gray-100">
                <svg
                  height={50}
                  width={50}
                  className="h-12"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="PermIdentityIcon"
                >
                  <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              <h1 className="p-3 text-2xl">{video.users?.name}</h1>
            </div>

            <p className="m-5 rounded-lg bg-gray-200 p-3 py-6">
              {video.description}
            </p>

            <div className="mt-4  p-5 pt-4">
              {video && video.comments?.length > 0 && (
                <div className="text-xl font-semibold">
                  {video.comments.length}
                  {video.comments.length === 1 ? " Comment" : " Comments"}
                </div>
              )}
              {user && user.jwt && (
                <form onSubmit={handleSubmit(handleCommentSendSubmit)}>
                  <textarea
                    className="mt-5 mb-2 w-full rounded-lg border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500"
                    rows={5}
                    placeholder="Write a comment..."
                    {...register("comment")}
                  />
                  <button
                    className="rounded-lg  bg-red-500 py-2 px-5 text-black"
                    type="submit"
                  >
                    Send
                  </button>
                </form>
              )}

              {getComments()}
            </div>
          </div>
          <div className="h-full w-1/5 flex-col p-5">
            <h1>Recomended</h1>
            {getVideos}
          </div>
        </div>
      </div>
    );

  return <div />;
};

export default Video;
