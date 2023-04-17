import { useMutation } from "react-query";

import { useUserSessionContext } from "../contexts/userContext";

interface ICommentMutation {
  message: string;
  video_uuid: string;
  parrent_uuid?: string;
}
export const CreateCommentMutation = () => {
  const user = useUserSessionContext();
  return useMutation({
    mutationFn: async (comment: ICommentMutation) => {
      const response = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user?.jwt}`,
        },
        body: JSON.stringify(comment),
      });
      return response.json();
    },
  });
};
