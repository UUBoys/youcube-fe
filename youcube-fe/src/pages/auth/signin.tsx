/* eslint-disable import/no-extraneous-dependencies */
import { getProviders, getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

type LoginValues = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { register, handleSubmit } = useForm<LoginValues>();

  const handleCredentialsLogin = ({ email, password }: LoginValues) => {
    console.log(email, password);
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex h-full w-full items-center bg-white">
      <div className="mx-auto flex h-[500px] w-11/12  flex-col gap-20 rounded-md border-[.3px] p-10 shadow-2xl sm:w-[400px] sm:gap-32">
        <div className="w-full text-center text-3xl font-bold text-black">
          LOGIN
        </div>
        <div className="w-full ">
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
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

export default SignIn;
