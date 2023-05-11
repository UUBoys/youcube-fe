/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";

import Thumbnail from "@/modules/common/components/Thumbnail";
import { useUserSessionContext } from "@/modules/contexts/userContext";
import { GetUserQuery } from "@/modules/queries/UserQuery";
import { IVideo } from "@/modules/utils/schemas/video";

const Profile = () => {
  const loggedUser = useUserSessionContext();
  const router = useRouter();
  const [subscribed, setSubscribed] = React.useState(false);
  const { data, isLoading } = GetUserQuery(router.query.id as string);

  const handleSubcribeChange = () => {
    // TO DO:...
    setSubscribed(!subscribed);
  };

  useEffect(() => {
    if (!loggedUser || !loggedUser.user) router.push("/login");
    if (loggedUser && loggedUser?.user?.uuid === router.query.id)
      router.push("/profile");
  }, [router, loggedUser]);

  return (
    // @ts-ignore broken definition of LoadingOverlay
    <LoadingOverlay
      className="h-screen w-full"
      spinner
      active={isLoading}
      text="Načítání..."
    >
      {" "}
      <div className="mt-10 flex h-screen w-full flex-col items-center bg-white p-6 pt-16 text-black">
        <div className="w-full">
          <div className="mt-24 rounded-xl bg-white p-8 shadow-[0px_7px_29px_0px_rgba(0,0,0,0.1)]">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="order-last mt-20 grid grid-cols-2 text-center md:order-first md:mt-0">
                <div>
                  <p className="text-xl font-bold text-gray-700">
                    {data?.videos ? data?.videos.length : ""}
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
                <button
                  className={` rounded py-2 px-4 uppercase ${subscribed
                    ? "bg-red-500 text-white hover:bg-red-500"
                    : "bg-white text-red-500 hover:bg-white"
                    } border-2 border-red-500 font-medium shadow transition hover:-translate-y-0.5 hover:shadow-lg`}
                  onClick={() => handleSubcribeChange()}
                >
                  {subscribed ? "Unsubscribe" : "Subscribe"}
                </button>
                <button className="rounded bg-gray-700 py-2 px-4 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg">
                  Report
                </button>
              </div>
            </div>
            <div className="mt-20 border-b pb-12 text-center">
              <h1 className="text-4xl font-medium text-gray-700">
                {data?.name}
              </h1>
            </div>
            <div className="mt-12 flex flex-row space-x-4">
              {data?.videos?.map((video: IVideo) => (
                <Thumbnail video={video} key={video.uuid} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Profile;
