import Image from "next/image";
import Link from "next/link";
import { getProviders, getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

type LoginValues = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { register, handleSubmit } = useForm<LoginValues>();

  const handleCredentialsLogin = ({ email, password }: LoginValues) => {
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  const handleGithubLogin = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <section className=" h-screen w-full bg-gray-50">
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full content-center items-center justify-center">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-gray-300 shadow-lg">
              <div className="mb-0 rounded-t p-6">
                <div className="mb-3 text-center">
                  <h6 className="text-sm font-bold text-gray-600">
                    Sign in with
                  </h6>
                </div>
                <div className="text-center">
                  <button
                    className="mr-1 mb-1 inline-flex items-center rounded bg-white px-4 py-2 text-xs font-bold uppercase text-gray-800 shadow outline-none hover:shadow-md focus:outline-none active:bg-gray-100"
                    onClick={handleGithubLogin}
                  >
                    <Image
                      width={24}
                      height={24}
                      alt="..."
                      src="/includes/google-logo.svg"
                    />
                    <span className="ml-2 ">Google</span>
                  </button>
                </div>
                <hr className="mt-6 border-b-2 border-gray-400" />
              </div>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <div className="mb-3 text-center font-bold text-gray-500">
                  <small>Or sign in with credentials</small>
                </div>
                <form onSubmit={handleSubmit(handleCredentialsLogin)}>
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
                      Sign In
                    </button>
                  </div>
                </form>
                <div className="mt-6 flex flex-col text-center text-base">
                  <Link href="#pablo">
                    <small>Forgot password?</small>
                  </Link>
                  <span className="text-xs text-gray-700">or</span>
                  <Link href="/auth/signup">
                    <small>Create new account</small>
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
