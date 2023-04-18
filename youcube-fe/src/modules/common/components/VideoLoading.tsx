import React from "react";

interface VideoLoadingProps {
  additionalStyles?: string;
}

const VideoLoading: React.FC<VideoLoadingProps> = ({
  additionalStyles,
}: VideoLoadingProps) => {
  return (
    <div className={`flex flex-col ${additionalStyles}`}>
      <div
        role="status"
        className="flex h-56 w-[400px] max-w-sm animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700"
      >
        <svg
          className="h-12 w-12 text-gray-200 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 384 512"
        >
          <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="my-3 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2 h-2 max-w-[400px] rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2 h-2 max-w-[400px] rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>
  );
};

export default VideoLoading;
