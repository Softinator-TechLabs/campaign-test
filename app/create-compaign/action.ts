'use server';

import { db } from '@/lib/firebase/firebase_admin';
import { serverTimestamp } from 'firebase/firestore';

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

    console.log(
      'check data',
      delivery,
      ticketNotCompleted,
      noAccount, //on or null checkboxe
      template,
      ticketType,
      campaignName,
      selectedTicket,
      ticketNotAssigned,
      orderUnpaid
    );

    const campaignData = {
      name: campaignName,
      status: clickedBtn == 'save' ? 'In-Progress' : 'complete',
      selectedTicket,
      ticketType,
      filter: {
        delivery,
        noAccount,
        ticketNotCompleted,
        ticketNotAssigned,
        orderUnpaid
      },
      selectedTemplate: template,
      createdAt: serverTimestamp()
    };
    await db.collection('campaign').add(campaignData);
    return {
      mode: prev.mode,
      error: false,
      message: 'success'
    };
  } catch (error: any) {
    return {
      mode: prev.mode,
      error: true,
      message: error.message
    };
  }
}
