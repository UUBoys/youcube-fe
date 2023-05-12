/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { NextPage } from "next";
import Link from "next/link";
import { useMemo } from "react";

import Thumbnail from "@/modules/common/components/Thumbnail";
import VideoLoading from "@/modules/common/components/VideoLoading";
import { GetTagsQuery } from "@/modules/queries/TagsQuery";
import { GetVideosQuery } from "@/modules/queries/VideoQuery";
import { useSearchStore } from "@/modules/stores/search-store";

const Home: NextPage = () => {
  const { search } = useSearchStore((state) => ({ search: state.search }));
  const { data, isLoading, error } = GetVideosQuery();
  const { data: tags } = GetTagsQuery();
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data?.filter((video) =>
      video.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);
  if (isLoading)
    return (
      <div className="mt-16 flex h-[90vh] w-full flex-row flex-wrap space-x-3 space-y-3 bg-white text-black">
        {[...Array(30)].map((_, i) => (
          <VideoLoading additionalStyles={i === 0 ? "pl-3 pt-3" : undefined} />
        ))}
      </div>
    );

  if (filteredData && filteredData.length > 0)
    return (
      <div className="flex flex-col">
        <div className="mt-24 w-full px-5">
          <div className="flex flex-wrap ">
            <Link
              href="/"
              className="mb-3 min-w-[100px]  rounded-full bg-gray-400 p-3 text-center text-black transition-all"
            >
              All
            </Link>
            {tags?.map((tag) => (
              <Link
                href={`/${tag?.id}`}
                className="ml-3 mb-3 min-w-[100px]  rounded-full bg-gray-300 p-3 text-center text-black transition-all"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-16 flex h-full min-h-screen w-full flex-row flex-wrap content-start space-x-3 space-y-3 bg-white">
          {filteredData.map((video, i) => (
            <Thumbnail
              video={video}
              additionalStyles={i === 0 ? "pl-3 pt-3" : undefined}
            />
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="mt-16 flex h-[90vh] w-full flex-row flex-wrap space-x-3 space-y-3 bg-white">
        Došlo k chybě
      </div>
    );

  const noVideoComp = () => {
    return (
      <div className="mt-16 flex h-[90vh] w-full flex-row flex-wrap space-x-3 space-y-3 bg-white">
        No videos
      </div>
    );
  };

  return (
    <div className="mt-16 flex h-[90vh] w-full flex-row flex-wrap space-x-3 space-y-3 bg-white">
      {noVideoComp()}
    </div>
  );
};

export default Home;
