import { useQuery } from "react-query";

export const GetUserQuery = (uuid?: string) => {
  return useQuery({
    queryKey: "users",
    queryFn: async () => {
      if (!uuid) return null;
      const response = await fetch(`/api/users/${uuid}`, {
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
