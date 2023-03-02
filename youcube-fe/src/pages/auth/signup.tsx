/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from "next/link";
import { CtxOrReq } from "next-auth/client/_utils";
import { getProviders, getSession } from "next-auth/react";
import { useForm } from "react-hook-form";

type LoginValues = {
  name: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginValues>();

  const handleSignUp = async ({ name, email, password }: LoginValues) => {};

  return (
    <section className=" h-screen w-full bg-gray-50">
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full content-center items-center justify-center">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-gray-300 shadow-lg">
              <div className="flex-auto px-4 py-10 lg:px-10">
                <div className="mb-3 text-center font-bold text-gray-500" />
                <form onSubmit={handleSubmit(handleSignUp)}>
                  <div className="relative mb-3 w-full">
                    <label className="mb-2 block text-xs font-bold uppercase text-gray-700">
                      Name
                      <input
                        {...register("name")}
                        type="text"
                        className=" w-full rounded bg-white p-3 text-sm text-gray-700 shadow placeholder:text-gray-400 focus:outline-none"
                        placeholder="Name"
                      />
                    </label>
                  </div>
                  <div className="relative mb-3 w-full">
                    <label className="mb-2 block text-xs font-bold uppercase text-gray-700">
                      Email
                      <input
                        {...register("email")}
                        type="email"
                        className=" w-full rounded bg-white p-3 text-sm text-gray-700 shadow placeholder:text-gray-400 focus:outline-none"
                        placeholder="Email"
                      />
                    </label>
                  </div>
                  <div className="relative mb-3 w-full">
                    <label className="mb-2 block text-xs font-bold uppercase text-gray-700">
                      Password
                      <input
                        {...register("password")}
                        type="password"
                        className=" w-full rounded bg-white p-3 text-sm text-gray-700 shadow placeholder:text-gray-400 focus:outline-none"
                        placeholder="Password"
                      />
                    </label>
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      className="mr-1 mb-1 w-full rounded bg-gray-900 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-gray-700"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="mt-2 flex flex-col text-center text-base">
                  <span className="text-xs text-gray-700">or</span>
                  <Link href="/auth/signin">
                    <small>Sign in</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
