import { getSecret } from "astro:env/server";

export const clientId = getSecret("OAUTH_GITHUB_CLIENT_ID");
export const clientSecret = getSecret("OAUTH_GITHUB_CLIENT_SECRET");

export const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user`;
export const tokenUrl = "https://github.com/login/oauth/access_token";

export const prerender = "false";

