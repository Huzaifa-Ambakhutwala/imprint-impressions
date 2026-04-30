import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

function getEnv(name: string) {
  return process.env[name] ?? process.env[name.toLowerCase()];
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export const Route = createFileRoute("/api/estimate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = getEnv("RESEND_API_KEY") ?? getEnv("resend_api_key");
        if (!apiKey) return json(500, { ok: false, error: "Missing RESEND_API_KEY" });

        let payload: any;
        try {
          payload = await request.json();
        } catch {
          return json(400, { ok: false, error: "Invalid JSON body" });
        }

        const name = String(payload?.name ?? "").trim();
        const company = String(payload?.company ?? "").trim();
        const contact = String(payload?.contact ?? payload?.phone ?? "").trim();
        const project = String(payload?.project ?? "").trim();
        const message = String(payload?.message ?? "").trim();
        const website = String(payload?.website ?? "").trim(); // honeypot

        if (website) return json(400, { ok: false, error: "Invalid submission" });
        if (!name) return json(400, { ok: false, error: "Name is required" });
        if (!contact) return json(400, { ok: false, error: "Phone or email is required" });
        if (!message) return json(400, { ok: false, error: "Message is required" });

        const to = getEnv("ESTIMATE_TO_EMAIL") ?? "info@mnzsigns.com";
        const from = getEnv("RESEND_FROM") ?? "MNZ Signs <onboarding@resend.dev>";

        const subject = `Estimate request — ${name}${company ? ` (${company})` : ""}`;
        const text = [
          `Name: ${name}`,
          company ? `Company: ${company}` : null,
          `Contact: ${contact}`,
          project ? `Project: ${project}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n");

        const resend = new Resend(apiKey);
        const result = await resend.emails.send({
          from,
          to,
          subject,
          replyTo: contact.includes("@") ? contact : undefined,
          text,
        });

        if ((result as any)?.error) {
          return json(502, { ok: false, error: (result as any).error });
        }

        return json(200, { ok: true });
      },
    },
  },
});

