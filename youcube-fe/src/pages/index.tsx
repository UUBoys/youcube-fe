import { NextPage } from "next";
import Head from "next/head";
import HomeScreen from "./";
import Thumbnail from "@/modules/common/components/Thumbnail";
import { GetVideosMutation } from "@/modules/mutations/VideoMutations";
import VideoLoading from "@/modules/common/components/VideoLoading";

const Home: NextPage = () => {
  const { data, isLoading, error } = GetVideosMutation();

  if (isLoading) return (
    <div className="w-full bg-white flex flex-row space-x-3 space-y-3 flex-wrap mt-16 h-[90vh] text-black">
      {[...Array(30)].map((_, i) => (
        <VideoLoading key={i} additionalStyles={i === 0 ? "pl-3 pt-3" : undefined} />
      ))
      }
    </div>
  )

  if (data && data.length > 0) return (
    <div className="h-full w-full min-h-screen bg-white flex flex-row space-x-3 space-y-3 flex-wrap mt-16">
      {data.map((video, i) => (
        <Thumbnail video={video} additionalStyles={i === 0 ? "pl-3 pt-3" : undefined} />
      ))}
    </div>
  );

  if (error) return (
    <div className="w-full bg-white flex flex-row space-x-3 space-y-3 flex-wrap mt-16 h-[90vh]">
      Došlo k chybě
    </div>
  )

  return (
    <div className="w-full bg-white flex flex-row space-x-3 space-y-3 flex-wrap mt-16 h-[90vh]">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, incidunt fugit consequatur obcaecati velit qui quasi similique, esse tempora delectus cupiditate illo rerum tempore. Ipsam distinctio a assumenda non iste.
    </div>
  )
};

export default Home;
