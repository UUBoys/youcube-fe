import { NextPage } from "next";

import Thumbnail from "@/modules/common/components/Thumbnail";
import VideoLoading from "@/modules/common/components/VideoLoading";
import { GetVideosQuery } from "@/modules/queries/VideoQuery";

const Home: NextPage = () => {
  const { data, isLoading, error } = GetVideosQuery();

  if (isLoading)
    return (
      <div className="mt-16 flex h-[90vh] w-full flex-row flex-wrap space-x-3 space-y-3 bg-white text-black">
        {[...Array(30)].map((_, i) => (
          <VideoLoading
            key={i}
            additionalStyles={i === 0 ? "pl-3 pt-3" : undefined}
          />
        ))}
      </div>
    );

  if (data && data.length > 0)
    return (
      <div className="mt-16 flex h-full min-h-screen w-full flex-row flex-wrap space-x-3 space-y-3 bg-white">
        {data.map((video, i) => (
          <Thumbnail
            video={video}
            additionalStyles={i === 0 ? "pl-3 pt-3" : undefined}
          />
        ))}
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
