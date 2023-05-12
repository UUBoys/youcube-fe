/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable import/no-extraneous-dependencies */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingOverlay from "react-loading-overlay";

import { useSetUserSessionContext } from "@/modules/contexts/userContext";
import { LoginMutation } from "@/modules/mutations/UserMutations";

type LoginValues = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { register, handleSubmit } = useForm<LoginValues>();
  const { mutateAsync, data, isLoading } = LoginMutation();
  const [defaultError, setDefaultError] = useState("");
  const router = useRouter();

  const setSessionUser = useSetUserSessionContext();
  useEffect(() => {
    setSessionUser({});
  }, [setSessionUser]);

  useEffect(() => {
    if (data?.user && data?.jwt) {
      setSessionUser(data);
      router.push("/");
    }
  }, [data]);

  const handleCredentialsLogin = async ({ email, password }: LoginValues) => {
    const res = await mutateAsync({ email, password });
    if (res.error) {
      if (res.error === "Unauthorized") {
        setDefaultError("Špatné heslo nebo email");
        return;
      }
      setDefaultError(res.error);
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
      <div className="flex h-screen w-full items-center bg-white">
        {" "}
        <div className="mx-auto flex h-[500px] w-11/12  flex-col gap-20 rounded-md border-[.3px] p-10 shadow-2xl sm:w-[400px] sm:gap-32">
          <div className="w-full text-center text-3xl font-bold text-black">
            Přihlášení
          </div>
          <div className="w-full ">
            {defaultError !== "" && (
              <p className="mt-2 text-xl italic text-red-500">{defaultError}</p>
            )}
            <form action="" onSubmit={handleSubmit(handleCredentialsLogin)}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium  text-gray-900 dark:text-white"
                >
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="block w-full rounded-lg border !border-primary-100 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-lg placeholder:text-gray-400 focus:border-2  focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Email"
                    required
                  />
                </label>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  <input
                    {...register("password")}
                    type="password"
                    id="password"
                    className="block w-full rounded-lg border !border-primary-100 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-lg placeholder:text-gray-400 focus:border-primary-500 focus:ring-primary-500  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    required
                    placeholder="Password"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-secondary-900 px-5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-primary-200 focus:outline-none focus:ring-4  "
              >
                Log in
              </button>
            </form>
            <Link
              href="/auth/signup"
              className="mt-3 block text-center text-sm font-light text-gray-600 dark:text-white"
            >
              Register here
            </Link>
          </div>
        </div>{" "}
      </div>{" "}
    </LoadingOverlay>
  );
};

export default SignIn;
