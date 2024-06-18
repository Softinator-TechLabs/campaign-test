import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/react-dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
export default function TableBodyComponent({
  campaigns
}: {
  campaigns: any[];
}) {
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
                <DropdownMenuItem
                  asChild
                  disabled={campaign.status == 'In-Progress' ? false : true}
                >
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
