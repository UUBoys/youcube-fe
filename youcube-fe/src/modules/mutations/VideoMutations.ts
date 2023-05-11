import { useMutation } from "react-query";

import { useUserSessionContext } from "../contexts/userContext";
import { ISingleVIdeo } from "../utils/schemas/video";

interface IVideoMutation {
  video: ISingleVIdeo;
  token: string;
}
export const VideoMutation = () => {
  return useMutation({
    mutationFn: async (video: IVideoMutation) => {
      const response = await fetch("/api/videos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${video.token}`,
        },
        body: JSON.stringify(video.video),
      });
      return response.json();
    },
  });
};

export const DeleteVideoMutation = () => {
  const user = useUserSessionContext();
  return useMutation({
    mutationFn: async (uuid: string) => {
      const response = await fetch(`/api/videos/${uuid}`, {
        method: "DELETE",
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
