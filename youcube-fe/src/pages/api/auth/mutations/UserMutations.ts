import { useMutation } from "react-query";

import { ILogin, IRegister } from "@/modules/utils/schemas/auth";

export const RegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: IRegister) => {
      console.log(process.env.API_ENDPOINT);
      const response = await fetch(
        `https://youcube-be.azurewebsites.net/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data),
        }
      );
      return response.json();
    },
  });
};

export const LoginMutation = () => {
  return useMutation({
    mutationFn: async (data: ILogin) => {
      const response = await fetch(
        "https://youcube-be.azurewebsites.net/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data),
        }
      );

      return response.json();
    },
  });
};
