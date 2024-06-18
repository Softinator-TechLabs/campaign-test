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
  filter: object;
  type: string;
  recipients: string;
  status: string;
  template: string;
  selectedTicket: string;
};

export function CampaignData({ offset }: { offset: number | null }) {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  // const test = async () => {
  //   await fetch('/api/test');
  // };
  useEffect(() => {
    // test();
    const campaignsCollection = collection(db, 'campaigns');
    const unsubscribe = onSnapshot(campaignsCollection, (snapshot) => {
      const campaignData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
      // console.log('campaignData: ' + JSON.stringify(campaignData));
      setCampaigns(campaignData);
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

function TableBodyComponent({ campaigns }: { campaigns: any[] }) {
  return (
    <>
      {campaigns.map((campaign, index) => (
        <TableRow key={index}>
          <TableCell>{campaign.name}</TableCell>
          <TableCell>
            {campaign?.filter
              ? Object.entries(campaign.filter)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ')
              : ''}
          </TableCell>
          <TableCell>{campaign.selectedTicket}</TableCell>
          <TableCell>{campaign.recipients}</TableCell>
          <TableCell>{campaign.status}</TableCell>
          <TableCell>
            {campaign.templateName
              ? campaign.templateName
              : campaign.selectedTemplate}
          </TableCell>
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
