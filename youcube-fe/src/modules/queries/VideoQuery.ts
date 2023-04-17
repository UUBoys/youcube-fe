import { useQuery } from "react-query";

import { IVideo } from "../utils/schemas/video";

export const GetVideosQuery = () => {
  return useQuery<IVideo[]>({
    queryKey: "videos",
    queryFn: async () => {
      const response = await fetch("/api/videos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.json();
    },
  });
};

export const GetVideoQuery = (uuid: string) => {
  return useQuery<IVideo>({
    queryKey: "video",
    queryFn: async () => {
      if (!uuid) throw new Error("No UUID provided");
      const response = await fetch(`/api/videos/${uuid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.json();
    },
  });
};
