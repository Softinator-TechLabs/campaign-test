import { CompaignBtn } from './(homepage)/_components/compaign';
import { Search } from './(homepage)/_components/search';
import { TableList } from './(homepage)/_components/table';

const users = [
  {
    id: 1,
    name: 'josh',
    filters: '121323',
    type: 'newtype',
    recipients: 'goood',
    status: 'hello',
    template: 'check'
  }
];

export default function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">UXDX Admin</h1>
      </div>
      <section className="flex justify-between">
        <div className="w-25 mb-4">
          <Search value={searchParams.q} />
        </div>
        <CompaignBtn />
      </section>
      <TableList users={users} offset={24} />
    </main>
  );
}
