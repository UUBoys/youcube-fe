/* eslint-disable jsx-a11y/label-has-associated-control */
import { zodResolver } from "@hookform/resolvers/zod";
import { CtxOrReq } from "next-auth/client/_utils";
import { getProviders, getSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { RegisterMutation } from "../api/auth/mutations/UserMutations";

import { IRegister, signUpSchema } from "@/modules/utils/schemas/auth";

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync } = RegisterMutation();

  const handleSignUp = async ({
    name,
    email,
    password,
    passwordCheck,
  }: IRegister) => {
    const res = await mutateAsync({ email, name, password, passwordCheck });
    console.log(res);
  };

  return (
    <div className="flex h-full w-full items-center bg-white">
      <div className="mx-auto flex  w-11/12  flex-col gap-20 rounded-md border-[.3px] p-10 shadow-2xl sm:w-[400px] sm:gap-32">
        <div className="w-full text-center text-3xl font-bold text-black">
          Register
        </div>
        <div className="w-full ">
          <form action="" onSubmit={handleSubmit(handleSignUp)}>
            <div className="mb-6">
              {errors.name && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.name?.message}
                </p>
              )}
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium  text-gray-900 dark:text-white"
              >
                <input
                  {...register("name")}
                  type="name"
                  id="name"
                  className="block w-full rounded-lg border !border-primary-100 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-lg placeholder:text-gray-400 focus:border-2  focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="name"
                  required
                />
              </label>
            </div>
            <div className="mb-6">
              {errors.email && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.email?.message}
                </p>
              )}
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
              {errors.password && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.password?.message}
                </p>
              )}
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
            <div className="mb-6">
              {errors.passwordCheck && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.passwordCheck?.message}
                </p>
              )}
              <label
                htmlFor="passwordCheck"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <input
                  {...register("passwordCheck")}
                  type="password"
                  id="passwordCheck"
                  className="block w-full rounded-lg border !border-primary-100 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-lg placeholder:text-gray-400 focus:border-primary-500 focus:ring-primary-500  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  required
                  placeholder="Repeat password"
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-secondary-900 px-5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-primary-200 focus:outline-none focus:ring-4  "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: CtxOrReq) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignUp;
