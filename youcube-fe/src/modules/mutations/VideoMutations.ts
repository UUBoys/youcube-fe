import { useMutation, useQuery } from "react-query"
import { IVideo } from "../utils/schemas/video"

interface IVideoMutation {
  video: Omit<IVideo, 'created' | 'uuid' | 'users'>
  token: string
}
export const VideoMutation = () => {
  return useMutation({
    mutationFn: async (video: IVideoMutation) => {
      const response = await fetch("/api/videos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${video.token}`,
        },
        body: JSON.stringify(video.video),
      })
      return response.json()
    },
  })
}

export const GetVideosMutation = () => {
  return useQuery<IVideo[]>({
    queryFn: async () => {
      const response = await fetch("/api/videos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      return response.json()
    },
  })
}

export const GetVideoMutation = (uuid: string) => {
  return useQuery<IVideo[]>({
    queryFn: async () => {
      const response = await fetch(`/api/videos/?uuid=${uuid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      return response.json()
    },
  })
}
