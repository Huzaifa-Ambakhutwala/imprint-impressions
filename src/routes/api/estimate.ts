import { createFileRoute } from "@tanstack/react-router";
import { gmailSendTextEmail } from "@/lib/gmail";

function getEnv(name: string) {
  return process.env[name] ?? process.env[name.toLowerCase()];
}

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

        const to = getEnv("ESTIMATE_TO_EMAIL") ?? "mnsignsnprints@gmail.com";
        const from = getEnv("GMAIL_FROM") ?? "mnzsignsnprints@gmail.com";

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

        const replyTo = looksLikeEmail(contact) ? contact : undefined;

        await gmailSendTextEmail({
          from,
          to,
          subject,
          text,
          replyTo,
        });

        // Optional auto-reply: only if the contact is an email address.
        if (replyTo) {
          const ackSubject = "We received your request — MNZ Signs & Prints";
          const ackText = [
            `Hi ${name},`,
            "",
            "Thanks for reaching out! We received your estimate request and will reply within 1 business day.",
            "",
            "Summary:",
            company ? `- Company: ${company}` : null,
            project ? `- Project: ${project}` : null,
            "",
            "— MNZ Signs & Prints",
          ]
            .filter(Boolean)
            .join("\n");

          await gmailSendTextEmail({
            from,
            to: replyTo,
            subject: ackSubject,
            text: ackText,
          });
        }

        return json(200, { ok: true });
      },
    },
  },
});

