import { NextPage } from "next";
import { useMemo, useEffect, useState } from "react";

import Thumbnail from "@/modules/common/components/Thumbnail";
import VideoLoading from "@/modules/common/components/VideoLoading";
import { GetVideosQuery } from "@/modules/queries/VideoQuery";
import { useSearchStore } from "@/modules/stores/search-store";
import { GetTagsQuery } from "@/modules/queries/TagsQuery";
import Link from "next/link";
import { useRouter } from "next/router";

const HomeFilter: NextPage = () => {
  const { search } = useSearchStore((state) => ({ search: state.search }));
  const { query } = useRouter()

  const { data, isLoading, error } = GetVideosQuery();
  const { data: tags } = GetTagsQuery()


  const filteredData = useMemo(() => {
    if (!search) return data?.filter((video) => video.tag === parseInt(query.id))
    return data?.filter((video) => {
      return video.title.toLowerCase().includes(search.toLowerCase()) && video.tag === parseInt(query.id)
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
    <div className={"flex flex-col"}>
      <div className={"mt-24 full-width space-x-4 px-5"}>
        <Link href={`/`} className={`bg-gray-600  text-white  py-3  rounded px-2`}>All</Link>
        {tags?.map((tag) => (
          <Link href={`/${tag.id}`} className={`${parseInt(query.id) === tag.id ? 'bg-black text-white' : 'bg-gray-600  text-white'} py-3  rounded px-2`}>{tag.name}</Link>
        ))}
      </div>

      {filteredData && filteredData.length > 0 && (
        <div className="mt-16 flex h-full min-h-screen w-full flex-row flex-wrap space-x-3 space-y-3 bg-white">
          {filteredData.map((video, i) => (
            <Thumbnail
              video={video}
              additionalStyles={i === 0 ? "pl-3 pt-3" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomeFilter;
