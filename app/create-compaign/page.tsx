import CampForm from '@/components/campaign-form';
import { getTemplates } from '@/lib/mailersend/getTemplates';
import { addCampaign } from './action';

const getTemplate = async () => {
  try {
    return await getTemplates();
  } catch (error: any) {
    console.log('Error fetching templates', error.message);
    return [];
  }
};

// const wait = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, 5000);
//   });

export default async function IndexPage() {
  // await wait(); to check Loader
  return (
    <main className="flex flex-col p-4 md:p-6 justify-center items-center h-screen">
      <section className="flex flex-col w-75">
        <div className="flex items-center mb-8">
          <h1 className="font-semibold text-lg md:text-2xl">Add Campaign</h1>
        </div>
        <CampForm
          mode="add"
          templates={await getTemplate()}
          campaignAction={addCampaign}
        />
      </section>
    </main>
  );
}
