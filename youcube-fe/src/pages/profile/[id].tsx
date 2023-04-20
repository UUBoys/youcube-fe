import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUserSessionContext } from "@/modules/contexts/userContext";
import { useQuery } from "react-query";
import { GetUserQuery } from "@/modules/queries/UserQuery";
import Thumbnail from "@/modules/common/components/Thumbnail";

const Profile = () => {
  const loggedUser = useUserSessionContext();
  const router = useRouter();
  const [subscribed, setSubscribed] = React.useState(false);
  const { data, isLoading } = GetUserQuery(router.query.id);

  const handleSubcribeChange = () => {
    // TO DO:...
    setSubscribed(!subscribed);
  }

  useEffect(() => {
    if (!loggedUser || !loggedUser.user) router.push("/login");
    if (loggedUser && loggedUser?.user?.uuid === router.query.id) router.push('/profile')
  }, [router, loggedUser]);

  const logout = () => {
    router.push("/auth/signin");
  };

  const uploadVideo = () => {
    router.push("/video/create");
  };

  if (isLoading) {
    return <></>
  }

  return (
    <div className="flex h-screen w-full flex-col items-center mt-10 bg-white p-6 pt-16 text-black">
      <div className="w-full">
        <div className="p-8 bg-white mt-24 rounded-xl shadow-[0px_7px_29px_0px_rgba(0,0,0,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">{data?.videos ? data?.videos.length : ""}</p>
                <p className="text-gray-400">Videos</p>
              </div>
              <div>
                {/* TO DO: Like count */}
                <p className="font-bold text-gray-700 text-xl">10</p>
                <p className="text-gray-400">Likes</p>
              </div>
              <div>
                {/* TO DO: Comments counts */}
                <p className="font-bold text-gray-700 text-xl">89</p>
                <p className="text-gray-400">Comments</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              {/* TO DO: Subscribe */}
              <button className={` py-2 px-4 uppercase rounded ${subscribed ? "text-white bg-red-500 hover:bg-red-500" : "bg-white hover:bg-white text-red-500"} border-2 border-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5`}
                onClick={() => handleSubcribeChange()}>
                {subscribed ? "Unsubscribe" : "Subscribe"}
              </button>
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Report
              </button>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">{data?.name}</h1>
            <p className="mt-8 text-gray-500">{"{bio}"}</p>
          </div>
          <div className="mt-12 flex flex-row space-x-4">
            {data?.videos?.map((video) => (
              <Thumbnail video={video} key={video.uuid} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
