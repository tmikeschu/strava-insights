// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { Athlete } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { SessionData, withSessionApiRoute } from "@/lib/session";
import { Router } from "next/router";
import { postJson } from "@/lib/api";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await postJson(process.env.STRAVA_DEAUTHORIZE_URI!, {
    access_token: req.session.accessToken,
  });
  req.session.destroy();
  return res.redirect(307, "/");
}

export default withSessionApiRoute(handler);
