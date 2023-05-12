/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

import {
  useSetUserSessionContext,
  useUserSessionContext,
} from "@/modules/contexts/userContext";
import { EditProfileMutation } from "@/modules/mutations/UserMutations";
import { IUser } from "@/modules/utils/schemas/user";

const Edit = () => {
  const user = useUserSessionContext();
  const setSessionUser = useSetUserSessionContext();

  const router = useRouter();
  const { register, handleSubmit } = useForm<IUser>();
  const { mutateAsync: mutateEditProfile, isLoading } = EditProfileMutation();

  const handleProfileChange = async (data: IUser) => {
    const res = await mutateEditProfile(data);
    if (res) {
      setSessionUser({
        ...user,
        user: {
          ...(user?.user as IUser),
          name: data.name,
          email: data.email,
        },
      });
      router.push("/profile");
      toast("Profil byl úspěšně upraven.", {
        type: "success",
      });
    }
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
          onSubmit={handleSubmit(handleProfileChange)}
        >
          <h2 className="mb-3 text-center text-3xl">Edit profile</h2>
          <div className="mb-6 ">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-0 placeholder:text-gray-600 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-red-500 dark:focus:ring-red-500"
              placeholder="Gejmr"
              defaultValue={user?.user?.name}
              {...register("name")}
            />
          </div>
          <div className="mb-6 ">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-0 placeholder:text-gray-600 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-red-500 dark:focus:ring-red-500"
              placeholder="email@noreply.com"
              defaultValue={user?.user?.email}
              {...register("email")}
            />
          </div>{" "}
          <div className="flex w-full flex-col items-center justify-center">
            <button
              type="submit"
              className="mr-2 mb-2 w-48 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              save
            </button>
          </div>
        </form>
      </div>
    </LoadingOverlay>
  );
};

export default Edit;
