export const prerender = "false";
import type { APIRoute } from "astro";
import { authUrl } from "./_config";

export const GET: APIRoute = ({ redirect }) => {
  console.log(authUrl);
  return redirect(authUrl);
};

