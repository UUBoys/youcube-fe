import { useMutation, useQuery } from "react-query";

export const GetLikeQuery = (video_uuid: string) => {
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

// export const SetLikeQuery = (isLiked: boolean, video_uuid: string) => {
//   return useMutation<any[]>({
//     queryKey: 'setlike',
//     queryFn: async () => {
//       const response = await fetch(`/api/${video_uuid}/like`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       });
//       return response.json();
//     },
//   });
// };
