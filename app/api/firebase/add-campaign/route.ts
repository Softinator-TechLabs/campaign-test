import { db } from '@/lib/firebase/firebase_admin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, status, selectedTicket, filterOptions, selectedTemplate } =
      body;
    const campaignData = {
      name,
      status,
      selectedTicket,
      filterOptions,
      selectedTemplate
    };

    const campaignRef = await db.collection('campaign').add(campaignData);
    console.log('Campaign created successfully with ID:', campaignRef.id);

    return NextResponse.json({
      message: 'Campaign created successfully',
      campaignId: campaignRef.id
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ Error: error.message });
  }
}
