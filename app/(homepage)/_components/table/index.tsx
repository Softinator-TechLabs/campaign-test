'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense, lazy } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase_client';

const TableBodyComponent = lazy(() => import('./tableData'));

export function CampaignData({ offset }: { offset: number | null }) {
  const [campaigns, setCampaigns] = useState<any[] | null>(null);
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  useEffect(() => {
    // for real-time data other we could use data from parent server components
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

  if (!campaigns) {
    return <div>Loading Data...</div>; // Or a spinner or any other loading indicator
  }

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
            <Suspense fallback={<div>Loading Table Data...</div>}>
              <TableBodyComponent campaigns={campaigns} />
            </Suspense>
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
