import { db } from '@/lib/firebase/firebase_admin';

type userType = {
  displayName: string;
  created: number;
  photoURL: string;
  id: string;
  email: string;
  lastLogin: string;
};

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const usersCollection = db.collection('users');
  const snapshot = await usersCollection.get();
  const users: userType[] = [];
  snapshot.forEach((doc) => {
    users.push(doc.data());
  });
  console.log('datrabase', users);
  Response.json({});
}
