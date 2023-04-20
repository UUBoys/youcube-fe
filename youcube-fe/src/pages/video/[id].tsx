/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/named */
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import LoadingOverlay from "react-loading-overlay";

import Thumbnail from "@/modules/common/components/Thumbnail";
import VideoLoading from "@/modules/common/components/VideoLoading";
import { useUserSessionContext } from "@/modules/contexts/userContext";
import {
  CreateCommentMutation,
  DeleteCommentMutation,
  UpdateCommentMutation,
} from "@/modules/mutations/CommentMutation";
import { GetVideoQuery, GetVideosQuery } from "@/modules/queries/VideoQuery";
import { IComment } from "@/modules/utils/schemas/video";

interface ICommentVideoForm {
  comment: string;
}

const SingleComment: React.FC<{
  comment: IComment;
  refetchVideo: () => void;
}> = ({ comment, refetchVideo }) => {
  const user = useUserSessionContext();
  const [isEditing, setIsEditing] = React.useState(false);

  const {
    mutateAsync: mutateRemoveComment,
    isLoading: isRemoveCommentLoading,
  } = DeleteCommentMutation();

  const { mutateAsync: mutateEditComment, isLoading: isLoadingEditComment } =
    UpdateCommentMutation();

  return (
    // @ts-ignore broken definition of LoadingOverlay
    <LoadingOverlay
      spinner
      active={isRemoveCommentLoading || isLoadingEditComment}
      text="Načítání..."
    >
      <div
        className={clsx(
          "flex flex-row gap-5 p-5",
          isEditing && "rounded-lg border-2 border-red-500"
        )}
      >
        <PersonIcon height={100} className="mt-2" width={100} />
        <div className="flex w-full flex-col">
          <div className="flex flex-row items-center text-[10px] text-gray-400">
            <div>{comment.users.name}</div>
            {user?.user?.uuid === comment.users.uuid && (
              <>
                <button
                  onClick={() => {
                    setIsEditing(!isEditing);
                  }}
                  className="flex justify-start"
                >
                  <ModeEditIcon className="scale-[0.6] " />
                </button>
                {isEditing && (
                  <button
                    onClick={async () => {
                      setIsEditing(!isEditing);
                      await mutateRemoveComment(comment.uuid);
                      refetchVideo();
                    }}
                    className="flex justify-start"
                  >
                    <DeleteIcon
                      className="scale-[0.6] transition-all hover:text-red-400 "
                      htmlColor="red"
                    />
                  </button>
                )}
              </>
            )}
          </div>
          <div className="flex w-full">
            {isEditing ? (
              <textarea
                className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-red-300 focus:outline-none focus:ring-0"
                defaultValue={comment.message}
                onBlur={async (e) => {
                  if (e.target.value === "") {
                    await mutateRemoveComment(comment.uuid);
                    refetchVideo();
                    setIsEditing(!isEditing);
                    return;
                  }
                  await mutateEditComment({
                    uuid: comment.uuid,
                    message: e.target.value,
                  });
                  refetchVideo();
                  setIsEditing(!isEditing);
                }}
              />
            ) : (
              <p>{comment.message}</p>
            )}
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export const Video = () => {
  const router = useRouter();
  const user = useUserSessionContext();
  const { mutateAsync: mutateAsyncCreateComment } = CreateCommentMutation();
  const { register, handleSubmit, reset } = useForm<ICommentVideoForm>();
  const { id } = router.query;

  const { data: video, refetch: refetchVideo } = GetVideoQuery(id as string);
  const { data: videos } = GetVideosQuery();

  useEffect(() => {
    if (router.isReady) {
      refetchVideo();
    }
  }, [id, refetchVideo, router.isReady]);

  const handleCommentSendSubmit = async (data: ICommentVideoForm) => {
    if (!user || !user.jwt) return;
    await mutateAsyncCreateComment({
      message: data.comment,
      video_uuid: id as string,
    });
    refetchVideo({ queryKey: [id as string] });
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
    return video.comments.map((comment) => {
      return (
        <SingleComment
          refetchVideo={refetchVideo}
          key={comment.uuid}
          comment={comment}
        />
      );
    });
  };

  const getVideos = useMemo((): JSX.Element[] => {
    if (!videos || !Array.isArray(videos))
      return [...Array(30)].map((_, i) => (
        <VideoLoading additionalStyles={i === 0 ? "pl-3 pt-3" : undefined} />
      ));

    return videos.map((videoPar, i) => {
      if (videoPar.uuid === id) return <div />;
      return (
        <div className={clsx(i !== 0 && "my-10")}>
          <Thumbnail
            video={videoPar}
            additionalStyles={i === 0 ? "pl-3 pt-3" : undefined}
          />
        </div>
      );
    });
  }, [id, videos]);

  if (video?.error) return <div>{video?.error}</div>;
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
            <h2 className="p-3 text-2xl text-gray-400">
              {video.videoView?.length}{" "}
              {video.videoView?.length === 1 ? "view" : "views"}
            </h2>
            <hr className="w-3/4" />
            <div className="flex flex-row pt-5 pr-5 justify-between	">
              <h1 className="ml-3 p-3 text-lg font-semibold text-gray-400">
                {getYouTubeLikeDate(new Date(video.created ?? ""))}
              </h1>
              <div className={"flex flex-row space-x-2"}>
                <button className="ml-auto rounded-full h-14  border border-gray-400 bg-gray-300 px-10 py-3 text-[20px] font-bold text-gray-600 transition-all hover:bg-gray-200">
                  {video._count?.liked_videos}
                  <ThumbUpIcon className="mb-2 ml-3" />
                </button>
                {video?.users?.uuid === user?.user?.uuid && <Link href={`/video/edit/${video.uuid}`} className="ml-auto rounded-full py-3 border border-red-400 bg-red-700 px-10 text-[20px] font-bold text-white transition-all hover:bg-red-900 h-14 justify-center ">Edit</Link>}
              </div>
            </div>
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

              <Link
                className="p-3 text-2xl"
                href={`/profile/${video.users?.uuid}`}
              >
                {video.users?.name}
              </Link>
            </div>

            <p className="m-5 rounded-lg bg-gray-200 p-3 py-6">
              {video.description}
            </p>

            <div className="mt-4  p-5 pt-4">
              {video && video.comments && video.comments?.length > 0 && (
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
      </div >
    );

  return <div />;
};

export default Video;
