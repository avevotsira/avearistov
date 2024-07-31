export const prerender = "false";
import type { APIRoute } from "astro";
import {
  OAUTH_GITHUB_CLIENT_ID,
  OAUTH_GITHUB_CLIENT_SECRET,
  getSecret,
} from "astro:env/server";

export const GET: APIRoute = async ({ url, redirect }) => {
  const clientId = getSecret(OAUTH_GITHUB_CLIENT_ID);
  const clientSecret = getSecret(OAUTH_GITHUB_CLIENT_SECRET);
  const tokenUrl = "https://github.com/login/oauth/access_token";

  const data = {
    code: url.searchParams.get("code"),
    client_id: clientId,
    client_secret: clientSecret,
  };

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.json();

    const content = {
      token: body.access_token,
      provider: "github",
    };

    const script = `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:${content.provider}:success:${JSON.stringify(
      content
    )}',
            message.origin
          );

          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);

        window.opener.postMessage("authorizing:${content.provider}", "*");
      </script>
    `;

    return new Response(script, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (err) {
    console.log(err);
    return redirect("/?error=😡");
  }
};

