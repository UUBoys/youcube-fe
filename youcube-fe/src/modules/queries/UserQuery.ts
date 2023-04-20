import { useQuery } from "react-query";

import { IUserSession } from "../utils/schemas/user";

export const GetUserQuery = (uuid: string) => {
  return useQuery({
    queryKey: "users",
    queryFn: async () => {
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
