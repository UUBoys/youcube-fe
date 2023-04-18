import { useMutation } from "react-query";

import { IVideo } from "../utils/schemas/video";

interface IVideoMutation {
  video: IVideo;
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
