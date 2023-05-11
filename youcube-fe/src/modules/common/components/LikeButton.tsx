import React from 'react'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface LikeButtonProps {
  isLiked: boolean
  onClick: () => void
  totalLikes: number
  isLoading?: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onClick, totalLikes, isLoading }: LikeButtonProps) => {
  const color = !isLiked ? 'text-gray-500' : 'text-gray-400'
  const bgColor = isLiked ? 'bg-primary-500' : 'bg-gray-300'

  return (
    <button className={`ml-auto h-14 rounded-full  border ${color} ${bgColor} px-10 py-3 text-[20px] font-bold text-gray-600 transition-all hover:bg-gray-200 flex`} onClick={onClick}>
      {
        isLoading ? (
          <div className="w-6 h-6 border-2 border-primary-500 rounded-full animate-spin" />
        ) : (
          <span className="mr-2">{totalLikes}</span>
        )
      }
      <ThumbUpIcon className="mb-2 ml-3" />
    </button>
  )
}

export default LikeButton
