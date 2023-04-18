/* eslint-disable sonarjs/no-duplicate-string */
import { useMutation } from "react-query";

import { useUserSessionContext } from "../contexts/userContext";

interface ICreateCommentMutation {
  message: string;
  video_uuid: string;
  parrent_uuid?: string;
}

interface IUpdateCommentMutation {
  message: string;
  uuid: string;
}

export const CreateCommentMutation = () => {
  const user = useUserSessionContext();
  return useMutation({
    mutationKey: "createComment",
    mutationFn: async (comment: ICreateCommentMutation) => {
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

export const DeleteCommentMutation = () => {
  const user = useUserSessionContext();
  return useMutation({
    mutationKey: "deleteComment",
    mutationFn: async (uuid: string) => {
      const response = await fetch(`/api/comment/${uuid}/delete`, {
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

export const UpdateCommentMutation = () => {
  const user = useUserSessionContext();
  return useMutation({
    mutationKey: "updateComment",
    mutationFn: async (comment: IUpdateCommentMutation) => {
      const response = await fetch(`/api/comment/${comment.uuid}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user?.jwt}`,
        },
        body: JSON.stringify({ message: comment.message }),
      });
      return response.json();
    },
  });
};
