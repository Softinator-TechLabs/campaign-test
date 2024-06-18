import { EmailParams, Recipient } from 'mailersend';
import { mailerSend } from './config';

// Custom type to define email parameters
export type CustomEmailParams = {
  from: string;
  fromName: string;
  to: string;
  name: string;
  templateId: string;
  info: {
    ticket: {
      ticketRef: string;
      ticketType: string;
      productName: string;
      startAndEndDates: string;
    };
    order: {
      orderId: string;
      productName: string;
    };
  };
};

export const sendEmail = async ({
  from,
  fromName,
  to,
  name,
  templateId,
  info
}: CustomEmailParams) => {
  if (!mailerSend) {
    console.error('MailerSend is not initialized');
    return;
  }

  const recipients = [new Recipient(to, name)];

  const variables = [
    {
      email: to,
      substitutions: [
        {
          var: 'ticketRef',
          value: info.ticket.ticketRef
        },
        {
          var: 'ticketType',
          value: info.ticket.ticketType
        },
        {
          var: 'productName',
          value: info.ticket.productName
        },
        {
          var: 'startAndEndDates',
          value: info.ticket.startAndEndDates
        },
        {
          var: 'orderId',
          value: info.order.orderId
        },
        {
          var: 'productName',
          value: info.order.productName
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
