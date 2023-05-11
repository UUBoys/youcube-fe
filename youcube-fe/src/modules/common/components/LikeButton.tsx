/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React from "react";

interface LikeButtonProps {
  isLiked: boolean;
  onClick: () => void;
  totalLikes: number;
  isLoading?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked,
  onClick,
  totalLikes,
  isLoading,
}: LikeButtonProps) => {
  const color = !isLiked ? "text-gray-500" : "text-gray-400";
  const bgColor = isLiked ? "bg-primary-500" : "bg-gray-300";
  const hoverBgColor = isLiked ? "hover:bg-primary-600" : "hover:bg-gray-400";

  return (
    <button
      className={`ml-auto h-14 rounded-full  border ${color} ${bgColor} ${hoverBgColor} flex px-10 py-3 text-[20px] font-bold text-gray-600 transition-all`}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500" />
      ) : (
        <span className="mr-2">{totalLikes}</span>
      )}
      <ThumbUpIcon className="mb-2 ml-3" />
    </button>
  );
};

export default LikeButton;
