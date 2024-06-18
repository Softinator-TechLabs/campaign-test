import { sendEmail } from '@/lib/mailersend/sendMail';
import CampForm from '@/components/campaign-form';
import { getTemplates } from '@/lib/mailersend/getTemplates';
import { EditCampaign } from './action';

export default async function IndexPage({ params }: { params: any }) {
  return (
    <main className="flex flex-col p-4 md:p-6 justify-center items-center">
      <section className="flex flex-col w-75">
        <div className="flex items-center mb-8">
          <h1 className="font-semibold text-lg md:text-2xl">Add Campaign</h1>
        </div>
        <CampForm
          mode="Edit"
          templates={await getTemplates()}
          campaignAction={EditCampaign}
          id={params.id}
        />
      </section>
    </main>
  );
}
