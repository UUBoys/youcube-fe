/* eslint-disable import/no-unresolved */
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
// eslint-disable-next-line camelcase
import { getServerSession } from "next-auth";
import { authOptions, AUTH_ROUTES } from "src/pages/api/auth/[...nextauth]";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    console.log(session);
    if (!session) {
      return {
        redirect: {
          destination: AUTH_ROUTES.signIn,
          permanent: false,
        },
      };
    }

    return func(ctx);
  };
