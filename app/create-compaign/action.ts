'use server';

import { db, FieldValue } from '@/lib/firebase/firebase_admin';
import { sendEmail } from '@/lib/mailersend/sendMail';
export async function addCampaign(prev: any, formdata: FormData) {
  try {
    const ticketType = formdata.get('ticketType');
    const campaignName = formdata.get('campaignName');
    const selectedTicket = formdata.get('selectedTicket');
    const delivery = formdata.get('delivery');
    const template = formdata.get('template');
    const noAccount = formdata.get('no-account');
    const ticketNotCompleted = formdata.get('ticket-not-completed');
    const ticketNotAssigned = formdata.get('ticket-not-assigned');
    const orderUnpaid = formdata.get('order-unpaid');
    const clickedBtn = formdata.get('button');

    console.log(`
      Check Data:
      - Delivery: ${delivery}
      - Ticket Not Completed: ${ticketNotCompleted}
      - No Account: ${noAccount} (on or null checkbox)
      - Template: ${template}
      - Ticket Type: ${ticketType}
      - Campaign Name: ${campaignName}
      - Selected Ticket: ${selectedTicket}
      - Ticket Not Assigned: ${ticketNotAssigned}
      - Order Unpaid: ${orderUnpaid}
    `);

    const campaignData = {
      name: campaignName,
      status: clickedBtn === 'save' ? 'In-Progress' : 'sent',
      selectedTicket,
      ticketType,
      filter: {
        delivery,
        noAccount: noAccount === 'on' ? true : false,
        ticketNotCompleted: ticketNotCompleted === 'on' ? true : false,
        ticketNotAssigned: ticketNotAssigned === 'on' ? true : false,
        orderUnpaid: orderUnpaid === 'on' ? true : false
      },
      selectedTemplate: template,
      createdAt: FieldValue.serverTimestamp()
    };
    await db.collection('campaigns').add(campaignData);
    // sending emails once have enough data
    if (clickedBtn == 'schedule') {
      // sendEmail({
      //   from: '',
      //   fromName: '',
      //   to: '',
      //   name: '',
      //   templateId: '',
      //   info: {
      //     ticket: {
      //       ticketRef: '',
      //       ticketType: '',
      //       productName: '',
      //       startAndEndDates: ''
      //     },
      //     order: {
      //       orderId: '',
      //       productName: ''
      //     }
      //   }
      // });
    }
    return {
      mode: prev.mode,
      error: false,
      message: 'success'
    };
  } catch (error: any) {
    console.log('error is', error.message);
    return {
      mode: prev.mode,
      error: true,
      message: error.message
    };
  }
}
