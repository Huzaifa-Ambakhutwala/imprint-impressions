function base64UrlEncode(input: string) {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function encodeMimeHeaderIfNeeded(value: string) {
  // RFC 2047 "encoded-word" for non-ASCII header values (e.g. em dash)
  // Gmail API expects raw RFC 5322 + MIME headers.
  if (/^[\x00-\x7F]*$/.test(value)) return value;
  const b64 = Buffer.from(value, "utf8").toString("base64");
  return `=?UTF-8?B?${b64}?=`;
}

function getEnv(name: string) {
  return process.env[name] ?? process.env[name.toLowerCase()];
}

export async function getGmailAccessToken() {
  const clientId = getEnv("GMAIL_CLIENT_ID");
  const clientSecret = getEnv("GMAIL_CLIENT_SECRET");
  const refreshToken = getEnv("GMAIL_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Gmail OAuth env vars (GMAIL_CLIENT_ID/SECRET/REFRESH_TOKEN)");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Failed to refresh Gmail token: ${JSON.stringify(json)}`);
  }

  return String(json.access_token);
}

export async function gmailSendTextEmail(opts: {
  from: string;
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const accessToken = await getGmailAccessToken();

  const headers = [
    `From: ${opts.from}`,
    `To: ${opts.to}`,
    `Subject: ${encodeMimeHeaderIfNeeded(opts.subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 7bit",
    opts.replyTo ? `Reply-To: ${opts.replyTo}` : null,
  ]
    .filter(Boolean)
    .join("\r\n");

  const raw = `${headers}\r\n\r\n${opts.text}\r\n`;

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ raw: base64UrlEncode(raw) }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Gmail send failed: ${JSON.stringify(json)}`);
  }

  return json;
}

