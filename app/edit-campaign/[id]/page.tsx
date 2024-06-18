import { sendEmail } from '@/lib/mailersend/sendMail';
import EditForm from './form';

export default function IndexPage() {
  return (
    <main className="flex flex-col p-4 md:p-6 justify-center items-center">
      <section className="flex flex-col w-75">
        <div className="flex items-center mb-8">
          <h1 className="font-semibold text-lg md:text-2xl">Add Campaign</h1>
        </div>
        <EditForm sendEmail={sendEmail} />
      </section>
    </main>
  );
}
