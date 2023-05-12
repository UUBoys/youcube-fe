/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/named */
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PersonIcon from "@mui/icons-material/Person";
import clsx from "clsx";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import LoadingOverlay from "react-loading-overlay";

import LikeButton from "@/modules/common/components/LikeButton";
import Thumbnail from "@/modules/common/components/Thumbnail";
import VideoLoading from "@/modules/common/components/VideoLoading";
import { useUserSessionContext } from "@/modules/contexts/userContext";
import {
  CreateCommentMutation,
  DeleteCommentMutation,
  UpdateCommentMutation,
} from "@/modules/mutations/CommentMutation";
import { LikeMutation } from "@/modules/mutations/LikeMutation";
import { GetVideoQuery, GetVideosQuery } from "@/modules/queries/VideoQuery";
import { IComment } from "@/modules/utils/schemas/video";

interface ICommentVideoForm {
  comment: IComment;
  allComments?: IComment[];
  refetchVideo: () => void;
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
            <Link href={`/profile/${comment.users.uuid}`}>
              {comment.users.name}
            </Link>
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

  const {
    data: videoData,
    refetch: refetchVideo,
    isLoading: refetchLoading,
  } = GetVideoQuery(id as string);
  const { data: videos } = GetVideosQuery();

  const { mutateAsync: likeVideo, isLoading: isLikeVideoLoading } =
    LikeMutation();

  useEffect(() => {
    if (router.isReady) {
      refetchVideo();
    }
  }, [id, refetchVideo, router.isReady]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCommentSendSubmit = async (data: any) => {
    if (!user || !user.jwt || data?.comment === "" || !data?.comment) return;
    await mutateAsyncCreateComment({
      message: data.comment,
      video_uuid: id as string,
    });
    refetchVideo({ queryKey: [id as string] });
    reset();
  };

  const getComments = useCallback((): JSX.Element[] => {
    if (!videoData?.video || !videoData?.video.comments) return [];
    return videoData?.video?.comments.map((comment) => {
      return (
        <SingleComment
          refetchVideo={() => {
            refetchVideo({ queryKey: [id as string] });
          }}
          key={comment.uuid}
          comment={comment}
        />
      );
    });
  }, [id, refetchVideo, videoData?.video]);

  const getVideos = useMemo((): JSX.Element[] => {
    if (!videos || !Array.isArray(videos))
      return [...Array(30)].map((_, i) => (
        <VideoLoading additionalStyles={i === 0 ? "pl-3 pt-3" : undefined} />
      ));

    return videos.map((videoPar, i) => {
      if (videoPar?.uuid === id) return <div />;
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

  if (videoData?.video?.error) return <div>{videoData?.video?.error}</div>;
  if (videoData?.video)
    return (
      <div className="mt-16 h-full min-h-screen w-full bg-white pr-20 pl-10 text-gray-600">
        <div className="flex h-screen w-full flex-row">
          <div className="h-screen w-4/5">
            <iframe
              width="100%"
              height="70%"
              src={`${videoData?.video.url}?autoplay=1`}
              title={videoData?.video.title}
              frameBorder="0"
              className="rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <h1 className="p-3 text-4xl">{videoData?.video.title}</h1>
            <h2 className="p-3 text-2xl text-gray-400">
              {videoData?.video?._count?.videoView}{" "}
              {videoData?.video?._count?.videoView === 1 ? "view" : "views"}
            </h2>
            <hr className="w-3/4" />
            <div className="flex flex-row justify-between pt-5 pr-5	">
              <h1 className="ml-3 p-3 text-lg font-semibold text-gray-400">
                {formatDistance(
                  new Date(videoData?.video.created ?? ""),
                  new Date(),
                  {
                    addSuffix: true,
                    // locale: cs
                  }
                )}
              </h1>
              <div className="flex flex-row space-x-2">
                <LikeButton
                  isLiked={videoData?.isLikedByUser ?? false}
                  totalLikes={videoData?.video?._count?.liked_videos ?? 0}
                  onClick={async () => {
                    if (!user || !user.jwt) return;
                    await likeVideo(videoData?.video?.uuid ?? "");
                    refetchVideo();
                  }}
                  isLoading={isLikeVideoLoading || refetchLoading}
                />
                {videoData?.video?.users?.uuid === user?.user?.uuid && (
                  <Link
                    href={`/video/edit/${videoData?.video.uuid}`}
                    className="ml-auto h-14 justify-center rounded-full border border-red-400 bg-red-700 py-3 px-10 text-[20px] font-bold text-white transition-all hover:bg-red-900 "
                  >
                    Edit
                  </Link>
                )}
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
                href={`/profile/${videoData?.video.users?.uuid}`}
              >
                {videoData?.video.users?.name}
              </Link>
            </div>

            <p className="m-5 rounded-lg bg-gray-200 p-3 py-6">
              {videoData?.video.description}
            </p>

            <div className="mt-4  p-5 pt-4">
              {videoData?.video &&
                videoData?.video.comments &&
                videoData?.video.comments?.length > 0 && (
                  <div className="text-xl font-semibold">
                    {videoData?.video.comments.length}
                    {videoData?.video.comments.length === 1
                      ? " Comment"
                      : " Comments"}
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
