import { createFileRoute } from "@tanstack/react-router";

function getEnv(name: string) {
  return process.env[name] ?? process.env[name.toLowerCase()];
}

function html(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export const Route = createFileRoute("/api/gmail/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const clientId = getEnv("GMAIL_CLIENT_ID");
        const clientSecret = getEnv("GMAIL_CLIENT_SECRET");
        const redirectUri = getEnv("GMAIL_REDIRECT_URI");

        if (!clientId || !clientSecret || !redirectUri) {
          return html("<h1>Missing env vars</h1><p>Set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REDIRECT_URI</p>", 500);
        }

        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const error = url.searchParams.get("error");

        if (error) {
          return html(`<h1>OAuth error</h1><pre>${error}</pre>`, 400);
        }
        if (!code) {
          return html("<h1>Missing code</h1>", 400);
        }

        const body = new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        });

        const res = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body,
        });

        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          return html(
            `<h1>Token exchange failed</h1><pre>${escapeHtml(JSON.stringify(json, null, 2))}</pre>`,
            500,
          );
        }

        const refreshToken = (json as any)?.refresh_token;

        return html(
          [
            "<h1>Gmail connected</h1>",
            "<p>Copy the value below into your Vercel env var <code>GMAIL_REFRESH_TOKEN</code>.</p>",
            refreshToken
              ? `<pre style="padding:12px;border:1px solid #ddd;border-radius:8px;white-space:pre-wrap;word-break:break-all;">${escapeHtml(
                  String(refreshToken),
                )}</pre>`
              : "<p><b>No refresh token returned.</b> Go back and reconnect. Make sure you used <code>prompt=consent</code> and you haven't already authorized this client without offline access.</p>",
            "<p>After setting the env var, redeploy your app.</p>",
          ].join(""),
        );
      },
    },
  },
});

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

