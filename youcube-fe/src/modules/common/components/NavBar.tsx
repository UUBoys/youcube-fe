import Link from "next/link";
import React from "react";

import { useUserSessionContext } from "@/modules/contexts/userContext";

const NavBar = () => {
  const user = useUserSessionContext();

  return (
    <nav className="fixed z-10 h-[4.5rem] w-screen border-gray-200 bg-white dark:bg-gray-900">
      <div className="flex w-full flex-wrap items-center justify-between p-4 px-12">
        <Link href="/" className="flex items-center">
          <span className="w self-center text-2xl font-semibold text-red-600 ">
            YOU
          </span>
          <span className="w self-center text-2xl font-semibold text-gray-900 ">
            CUBE
          </span>
        </Link>

        <form className="w-1/2">
          <div className="flex">
            <div className="relative w-full">
              <input
                type="search"
                className="z-20 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:border-l-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-red-500"
                placeholder="Hledat"
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-r-lg border border-red-700 bg-red-700 p-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="sr-only">Hledat</span>
              </button>
            </div>
          </div>
        </form>

        <div className="cursor-pointer">
          <Link
            href={user?.user ? "/profile" : "/auth/signin"}
            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-red-700 md:dark:hover:bg-transparent md:dark:hover:text-red-500"
          >
            <svg
              className="h-12"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="PermIdentityIcon"
            >
              <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
