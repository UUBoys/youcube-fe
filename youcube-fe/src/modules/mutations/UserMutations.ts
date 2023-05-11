/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useMutation } from "react-query";

import { useUserSessionContext } from "../contexts/userContext";
import { IUser } from "../utils/schemas/user";

import { ILogin, IRegister } from "@/modules/utils/schemas/auth";

export const RegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: IRegister) => {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.name,
        }),
      });
      return response.json();
    },
  });
};

export const LoginMutation = () => {
  return useMutation({
    mutationFn: async (data: ILogin) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      });

      return response.json();
    },
  });
};

export const EditProfileMutation = () => {
  const user = useUserSessionContext();
  return useMutation({
    mutationFn: async (data: IUser) => {
      const response = await fetch("/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user?.jwt}`,
        },
        body: JSON.stringify(data),
      });

      return response.json();
    },
  });
};
