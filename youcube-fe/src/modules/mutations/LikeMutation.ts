/* eslint-disable camelcase */
import { useMutation } from "react-query";

import { useUserSessionContext } from "../contexts/userContext";

export const LikeMutation = () => {
  const user = useUserSessionContext();
  return useMutation({
    mutationFn: async (video_uuid: string) => {
      const response = await fetch(`/api/videos/${video_uuid}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user?.jwt}`,
        },
      });
      return response.json();
    },
  });
};
