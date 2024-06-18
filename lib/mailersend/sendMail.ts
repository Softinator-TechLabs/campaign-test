import { EmailParams, Recipient } from 'mailersend';
import { mailerSend } from './config';

// Custom type to define email parameters
export type CustomEmailParams = {
  from: string;
  fromName: string;
  to: string;
  name: string;
  templateId: string;
};

export const sendEmail = async ({
  from,
  fromName,
  to,
  name,
  templateId
}: CustomEmailParams) => {
  if (!mailerSend) {
    console.error('MailerSend is not initialized');
    return;
  }

  const recipients = [new Recipient(to, name)];

  // Prepare variables for the template
  const variables = [
    {
      email: to,
      substitutions: [
        {
          var: 'name',
          value: name
        },
        {
          var: 'custom_var',
          value: 'Custom Value'
        }
      ]
    }
  ];

  const emailParams = new EmailParams({
    from: from,
    from_name: fromName, // Set from_name directly here
    to: recipients,
    template_id: templateId,
    variables: variables
  });

  try {
    const response = await mailerSend.email.send(emailParams);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
