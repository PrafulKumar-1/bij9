import nodemailer from "nodemailer";
import { Resend } from "resend";

import { env } from "@/lib/env";

type SendMailArgs = {
  to: string;
  subject: string;
  html: string;
};

const resend = env.EMAIL_PROVIDER_API_KEY ? new Resend(env.EMAIL_PROVIDER_API_KEY) : null;

const smtpTransporter = env.SMTP_HOST
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT ?? 587,
      secure: false,
      auth: env.SMTP_USER && env.SMTP_PASS ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    })
  : null;

export async function sendMail({ to, subject, html }: SendMailArgs) {
  const from = env.EMAIL_FROM ?? "no-reply@globalmerchexport.com";

  if (resend) {
    await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    return;
  }

  if (smtpTransporter) {
    await smtpTransporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    return;
  }

  // Fallback for local development with no email provider configured.
  console.info(`[mail:dev] to=${to} subject=${subject}`);
}
