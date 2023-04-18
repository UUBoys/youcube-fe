import { useQuery } from "react-query";

import { IVideo } from "../utils/schemas/video";

export const GetTagsQuery = () => {
  return useQuery<IVideo[]>({
    queryKey: "tags",
    queryFn: async () => {
      const response = await fetch("/api/tags", {
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
