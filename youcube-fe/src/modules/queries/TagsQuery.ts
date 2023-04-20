import { useQuery } from "react-query";

export const GetTagsQuery = () => {
  return useQuery<any[]>({
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
