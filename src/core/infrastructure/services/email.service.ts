import { EmailService } from "@/core/application/port/EmailService";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export class EmailServiceResend implements EmailService {
  async sendPasswordRecoveryEmail(to: string, token: string): Promise<void> {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: "Mod Switcher Activation",
      html:
        "<h1>Password Recovery Email</h1><p>The code of activation is:</p><p>" +
        token +
        "</p>",
    });
  }
  async sendActivationEmail(to: string, body: string): Promise<void> {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: "Mod Switcher Activation",
      html:
        `<h1>Activation Email</h1><p>The code of activation is:</p><p>` + body,
    });
  }
}
