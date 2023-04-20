import Link from "next/link";
import React, { useState } from "react";

const Edit = () => {
  const [username, setUsername] = useState("");
  const handleUsernameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setUsername(e.target.value);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setEmail(e.target.value);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white p-6 pt-16 text-black">
      <form
        className="w-full rounded-xl bg-white px-3 py-4 shadow-[0px_7px_29px_0px_rgba(0,0,0,0.1)] lg:w-1/2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
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
            onChange={handleUsernameChange}
            value={username}
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
            onChange={handleEmailChange}
            value={email}
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <Link
            href="/passwordChange"
            className="my-3 mb-5 text-center text-gray-700"
          >
            Change password
          </Link>
          <button
            type="submit"
            className="mr-2 mb-2 w-48 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
