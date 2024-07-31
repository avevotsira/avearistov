export const prerender = "false";
import type { APIRoute } from "astro";
import { OAUTH_GITHUB_CLIENT_ID, getSecret } from "astro:env/server";

export const GET: APIRoute = ({ redirect }) => {
  const clientId = getSecret(OAUTH_GITHUB_CLIENT_ID);
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user`;
  return redirect(authUrl);
};

