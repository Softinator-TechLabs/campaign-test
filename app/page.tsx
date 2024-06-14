// import { getUsers } from '@/lib/db';
import { TableList } from '@/components/table';
import { Search } from '@/components/search';
import { CompaignBtn } from '@/components/compaign';

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

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  // const { users, newOffset } = await getUsers(search, Number(offset));
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
