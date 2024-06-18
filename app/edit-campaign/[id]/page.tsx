import CampForm from '@/components/campaign-form';
import { getTemplates } from '@/lib/mailersend/getTemplates';
import { EditCampaign } from './action';
import { db } from '@/lib/firebase/firebase_admin';

const getCampaignData = async (id: string) => {
  try {
    const campaignDoc = await db.collection('campaigns').doc(id).get();
    if (campaignDoc.exists) {
      const data = campaignDoc.data();
      if (data?.createdAt) {
        data.createdAt = data.createdAt.toDate().toISOString();
      }
      return data;
    } else {
      console.error('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};

export default async function IndexPage({ params }: { params: any }) {
  return (
    <main className="flex flex-col p-4 md:p-6 justify-center items-center h-screen">
      <section className="flex flex-col w-75">
        <div className="flex items-center mb-8">
          <h1 className="font-semibold text-lg md:text-2xl">Add Campaign</h1>
        </div>
        <CampForm
          mode="Edit"
          templates={await getTemplates()}
          defaultValues={await getCampaignData(params.id)}
          campaignAction={EditCampaign}
          id={params.id}
        />
      </section>
    </main>
  );
}
