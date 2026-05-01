import { createFileRoute } from "@tanstack/react-router";

function getEnv(name: string) {
  return process.env[name] ?? process.env[name.toLowerCase()];
}

export const Route = createFileRoute("/api/gmail/connect")({
  server: {
    handlers: {
      GET: async () => {
        const clientId = getEnv("GMAIL_CLIENT_ID");
        const redirectUri = getEnv("GMAIL_REDIRECT_URI");

        if (!clientId || !redirectUri) {
          return new Response(
            "Missing GMAIL_CLIENT_ID or GMAIL_REDIRECT_URI env vars",
            { status: 500 },
          );
        }

        const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        url.searchParams.set("client_id", clientId);
        url.searchParams.set("redirect_uri", redirectUri);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("scope", "https://www.googleapis.com/auth/gmail.send");
        url.searchParams.set("access_type", "offline");
        url.searchParams.set("prompt", "consent");
        url.searchParams.set("include_granted_scopes", "true");

        return Response.redirect(url.toString(), 302);
      },
    },
  },
});

