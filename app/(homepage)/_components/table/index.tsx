'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/react-dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase_client';

type Campaign = {
  id: string;
  name: string;
  filters: string;
  type: string;
  recipients: string;
  status: string;
  template: string;
};

export function TableList({ offset }: { offset: number | null }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  useEffect(() => {
    const campaignsCollection = collection(db, 'campaign');
    const unsubscribe = onSnapshot(campaignsCollection, (snapshot) => {
      const campaignData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          filters: data.filters || '',
          type: data.type || '',
          recipients: data.recipients || '',
          status: data.status || '',
          template: data.template || ''
        };
      }) as Campaign[];
      setCampaigns(campaignData);
      console.log('data', campaignData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <form className="border shadow-sm rounded-lg w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Filter</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Recipients</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Template</TableHead>
              <TableHead className="w-0">
                <span className="sr-only">Action</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableBodyComponent campaigns={campaigns} />
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

function TableBodyComponent({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <>
      {campaigns.map((campaign) => (
        <TableRow key={campaign.id}>
          <TableCell>{campaign.name}</TableCell>
          <TableCell>{campaign.filters}</TableCell>
          <TableCell>{campaign.type}</TableCell>
          <TableCell>{campaign.recipients}</TableCell>
          <TableCell>{campaign.status}</TableCell>
          <TableCell>{campaign.template}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
                <span className="sr-only">Actions</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={`/edit-campaign/${campaign.id}`}>Edit</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
