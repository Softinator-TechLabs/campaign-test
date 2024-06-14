import { MailerSend } from 'mailersend';

export let mailerSend: MailerSend | null = null;

if (process.env.NEXT_PUBLIC_MAILERSEND_API) {
  mailerSend = new MailerSend({
    apiKey: process.env.NEXT_PUBLIC_MAILERSEND_API as string
  });
}
