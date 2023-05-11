/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable tailwindcss/no-custom-classname */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import Thumbnail from "@/modules/common/components/Thumbnail";
import { useUserSessionContext } from "@/modules/contexts/userContext";
import { GetUserQuery } from "@/modules/queries/UserQuery";
import { ISingleVIdeo } from "@/modules/utils/schemas/video";
import { DeleteVideoMutation } from "@/modules/mutations/VideoMutations";
import VideoLoading from "@/modules/common/components/VideoLoading";

const Profile = () => {
  const user = useUserSessionContext();
  const router = useRouter();

  const { data: fetchedUser, refetch: refetchUser } = GetUserQuery(
    user?.user?.uuid
  );

  const { mutateAsync: deleteVideo, isLoading: isVideoDeleteing } =
    DeleteVideoMutation();

  useEffect(() => {
    if (!user || !user.user) router.push("/login");
  }, [router, user]);

  return (
    <div className="mt-10 flex h-screen w-full flex-col items-center bg-white p-6 pt-16 text-black">
      <div className="w-full">
        <div className="mt-24 rounded-xl bg-white p-8 shadow-[0px_7px_29px_0px_rgba(0,0,0,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="order-last mt-20 grid grid-cols-2 text-center md:order-first md:mt-0">
              <div>
                {/* TO DO: Video count */}
                <p className="text-xl font-bold text-gray-700">
                  {fetchedUser && fetchedUser?.videos?.length}
                </p>
                <p className="text-gray-400">Videos</p>
              </div>
              <div>
                {/* TO DO: Like count */}
                <p className="text-xl font-bold text-gray-700">10</p>
                <p className="text-gray-400">Likes</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-x-0 top-0 mx-auto -mt-24 flex h-48 w-48 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 shadow-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-32 flex justify-between space-x-8 md:mt-0 md:justify-center">
              {/* TO DO: Subscribe */}
              <Link
                className={`"text-white hover:bg-red-500" rounded border-2 border-red-500 bg-red-500 py-3 px-4 font-medium uppercase shadow transition hover:-translate-y-0.5 hover:shadow-lg`}
                href="/profile/edit"
              >
                edit profile
              </Link>
            </div>
          </div>
          <div className="mt-20 border-b pb-12 text-center">
            <h1 className="text-4xl font-medium text-gray-700">
              {user?.user?.name}
            </h1>
          </div>
          <div className="mt-12 flex flex-row space-x-4">
            {isVideoDeleteing ? (
              <>
                <VideoLoading />
                <VideoLoading />
                <VideoLoading />
              </>
            ) : (
              fetchedUser &&
              fetchedUser?.videos?.map((video: ISingleVIdeo) => (
                <div className="flex flex-col space-y-2">
                  <Thumbnail key={video.uuid} video={video} />
                  <button
                    className="rounded border-2 border-red-500 bg-red-500 py-2 px-4 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-lg"
                    onClick={async () => {
                      await deleteVideo(video?.uuid ?? "");
                      refetchUser();
                    }}
                  >
                    delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
