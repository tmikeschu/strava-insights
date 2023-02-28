// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { NextApiHandler } from "next";
import { Athlete } from "./types";

const sessionOptions: IronSessionOptions = {
  cookieName: "strava-insights",
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export interface SessionData {
  athlete?: Athlete;
  accessToken?: string;
  expiresAt?: number;
}

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData extends SessionData {}
}

export const withSessionApiRoute = (handler: NextApiHandler) => {
  return withIronSessionApiRoute(handler, sessionOptions);
};

export const withSessionSsr = <P extends Record<string, unknown>>(
  handler: Parameters<typeof withIronSessionSsr<P>>[0]
) => {
  return withIronSessionSsr(handler, sessionOptions);
};
