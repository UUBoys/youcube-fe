import { useQuery } from "react-query";

import { useUserSessionContext } from "../contexts/userContext";
import { ISingleVIdeo, IVideo } from "../utils/schemas/video";

export const GetVideosQuery = () => {
  return useQuery<ISingleVIdeo[]>({
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
  const user = useUserSessionContext();

  const auth = user?.jwt && { Authorization: `Bearer ${user?.jwt}` };
  return useQuery<IVideo>({
    queryKey: ["video", uuid],
    queryFn: async (videoUuid) => {
      if (!uuid) throw new Error("No UUID provided");
      const response = await fetch(`/api/videos/${videoUuid.queryKey[1]}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          ...auth,
        },
      });
      return response.json();
    },
  });
};
