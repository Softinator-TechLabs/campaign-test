'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
// import { SelectUser } from '@/lib/db';
// import { deleteUser } from './actions';
import { useRouter } from 'next/navigation';

export type userType = {
  id: number;
  name: string;
  filters: string;
  type: string;
  recipients: string;
  status: string;
  template: string;
};

export function TableList({
  users,
  offset
}: {
  users: userType[];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Filter</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Recipients</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Template</TableHead>
              <TableHead className="hidden md:table-cell">Action</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function UserRow({ user }: { user: UserType }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="hidden md:table-cell">{user.filters}</TableCell>
      <TableCell>{user.type}</TableCell>
      <TableCell>{user.recipients}</TableCell>
      <TableCell>{user.status}</TableCell>
      <TableCell>{user.template}</TableCell>
      <TableCell>
        <Button className="w-full" size="sm" variant="outline">
          :
        </Button>
      </TableCell>
    </TableRow>
  );
}
