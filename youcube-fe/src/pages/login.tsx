/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <div className="flex h-full w-full items-center">
      <div className="mx-auto flex h-2/3 w-1/4 flex-col gap-40 rounded-md p-10 shadow-2xl">
        <div className="w-full text-center text-3xl font-bold">LOGIN</div>

        <div className="w-full">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              <input
                type="email"
                id="email"
                className="block w-full rounded-lg border-none bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-primary-500  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
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
                type="password"
                id="password"
                className="block w-full rounded-lg border-none bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-primary-500  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                required
                placeholder="Password"
              />
            </label>
          </div>{" "}
          <button
            type="submit"
            className="w-full rounded-lg bg-secondary-900 px-5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-primary-200 focus:outline-none focus:ring-4  "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
