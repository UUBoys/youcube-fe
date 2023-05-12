import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

import Thumbnail from "@/modules/common/components/Thumbnail";
import VideoLoading from "@/modules/common/components/VideoLoading";
import { GetTagsQuery } from "@/modules/queries/TagsQuery";
import { GetVideosQuery } from "@/modules/queries/VideoQuery";
import { useSearchStore } from "@/modules/stores/search-store";

const HomeFilter: NextPage = () => {
  const { search } = useSearchStore((state) => ({ search: state.search }));
  const { query } = useRouter();

  const { data, isLoading } = GetVideosQuery();
  const { data: tags } = GetTagsQuery();

  const filteredData = useMemo(() => {
    if (!search)
      return data?.filter(
        (video) => video?.tag === parseFloat(query.id as string)
      );
    return data?.filter((video) => {
      return (
        video?.title.toLowerCase().includes(search.toLowerCase()) &&
        video?.tag === parseFloat(query.id as string)
      );
    });
  }, [data, search, query]);

  if (isLoading)
    return (
      <div className="mt-16 flex h-[90vh] w-full flex-row flex-wrap space-x-3 space-y-3 bg-white text-black">
        {[...Array(30)].map((_, i) => (
          <VideoLoading additionalStyles={i === 0 ? "pl-3 pt-3" : undefined} />
        ))}
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="mt-24 w-full px-5">
        <div className="flex flex-wrap ">
          <Link
            href="/"
            className="mb-3 min-w-[100px] rounded-full bg-gray-300 p-3 text-center text-black transition-all"
          >
            All
          </Link>
          {tags?.map((tag) => (
            <Link
              href={`/${tag.id}`}
              className={`${
                parseFloat(query.id as string) === tag.id
                  ? "bg-gray-400 text-black transition-all"
                  : "bg-gray-300 text-black transition-all"
              } ml-3 mb-3  min-w-[100px] rounded-full p-3 text-center`}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>

      {filteredData && filteredData.length > 0 && (
        <div className="mt-16 flex h-full min-h-screen w-full flex-row flex-wrap content-start space-x-3 space-y-3 bg-white">
          {filteredData.map((video, i) => (
            <Thumbnail
              video={video}
              additionalStyles={i === 0 ? "pl-3 pt-3" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeFilter;
