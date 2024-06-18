'use server';

import { FieldValue, db } from '@/lib/firebase/firebase_admin';

export async function EditCampaign(prev: any, formdata: FormData) {
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
    const id = formdata.get('newid') as string | null;

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
      status: clickedBtn == 'save' ? 'In-Progress' : 'sent',
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
    if (id) {
      const campaignRef = db.collection('campaigns').doc(id);
      await campaignRef.update(campaignData);
      return {
        mode: prev.mode,
        error: false,
        message: 'success'
      };
    } else {
      return {
        mode: prev.mode,
        error: true,
        message: 'id not defined'
      };
    }
  } catch (error: any) {
    console.log('Error updating campaign', error.message);
    return {
      mode: prev.mode,
      error: true,
      message: error.message
    };
  }
}
