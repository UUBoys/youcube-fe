/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { useSearchStore } from "@/modules/stores/search-store";
import { IVideo } from "@/modules/utils/schemas/video";

interface ThumbnailProps {
  video: IVideo;
  additionalStyles?: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  video,
  additionalStyles,
}: ThumbnailProps) => {
  const { setSearch } = useSearchStore((state) => ({
    setSearch: state.setSearch,
  }));
  const youtube_video_id = video.url
    .match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)
    ?.pop();

  const [hovering, setHovering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleOnMouseEnter = () => {
    const id = setTimeout(() => {
      setHovering(true);
    }, 300);
    setTimeoutId(id);
  };

  const handleOnMouseLeave = () => {
    timeoutId && clearTimeout(timeoutId);
    setHovering(false);
    setLoading(true);
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  console.log(video);

  return (
    <Link
      href={`/video/${video.uuid}`}
      onClick={() => {
        setSearch("");
      }}
      className="max-h-[300px] max-w-[400px]"
    >
      <div
        className={`relative cursor-pointer ${additionalStyles} overflow-hidden`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        {hovering ? (
          <>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                Loading...
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0" />
            <iframe
              width="400"
              height="225"
              src={`${video.url}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
              onLoad={handleIframeLoad}
            />
          </>
        ) : (
          <Image
            src={`http://img.youtube.com/vi/${youtube_video_id}/0.jpg`}
            alt="Thumbnail"
            width={400}
            height={225}
            className="h-[225px] w-[400px] rounded-lg object-cover"
          />
        )}
        <p className="text-xs text-gray-400">{video.users.name}</p>
        <p className="text-md text-black">{video.title}</p>
        <div className="flex w-full justify-between">
          <p className="text-xs text-gray-400">
            {video.videoView?.length ?? 0}{" "}
            {video.videoView?.length === 1 ? "view" : "views"}
          </p>
          <p className="text-xs text-gray-400">
            {formatDistance(new Date(video.created), new Date(), {
              addSuffix: true,
              // locale: cs
            })}
          </p>
        </div>
        <Image
          src="https://this-person-does-not-exist.com/img/avatar-gen11335f91b926306570a611f1e89a927d.jpg"
          alt="Profile"
          width={80}
          height={80}
          className="absolute right-2 bottom-7 rounded-full border-2 border-white"
        />
      </div>
    </Link>
  );
};

export default Thumbnail;
