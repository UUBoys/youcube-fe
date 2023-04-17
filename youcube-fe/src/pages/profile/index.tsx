import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useUserSessionContext } from "@/modules/contexts/userContext";

const Profile = () => {
  const user = useUserSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.user) router.push("/login");
  }, [router, user]);

  const logout = () => {
    router.push("/auth/signin");
  };

  const uploadVideo = () => {
    router.push("/video/create");
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white p-6 pt-16 text-black">
      <h2 className="mb-3 text-3xl">Profile - {user?.user?.name}</h2>
      <button
        type="button"
        className="mr-2 mb-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        onClick={logout}
      >
        Logout
      </button>
      <button
        type="button"
        className="mr-2 mb-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        onClick={uploadVideo}
      >
        Upload video
      </button>
    </div>
  );
};

export default Profile;
