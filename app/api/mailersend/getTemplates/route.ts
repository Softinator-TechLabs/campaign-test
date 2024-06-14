import { getTemplates } from '@/lib/mailersend/getTemplates';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  let templates = await getTemplates();
  return Response.json(templates);
}
