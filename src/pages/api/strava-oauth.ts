// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { Athlete } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { SessionData, withSessionApiRoute } from "@/lib/session";
import { Router } from "next/router";
import { postJson } from "@/lib/api";

interface StravaTokenResponse {
  token_type: "Bearer";
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: Athlete;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    access_token: accessToken,
    athlete,
    expires_at: expiresAt,
  } = await postJson<StravaTokenResponse>(
    process.env.NEXT_PUBLIC_STRAVA_OAUTH_URL!,
    {
      client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.query.code,
    }
  );
  console.log("server", accessToken);

  Object.assign(req.session, {
    athlete,
    accessToken,
    expiresAt,
  } satisfies SessionData);

  await req.session.save();

  return res.redirect(307, "/athlete");
}

export default withSessionApiRoute(handler);
