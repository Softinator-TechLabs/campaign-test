'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import userImg from '@/public/images/user-image.jpg';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { signOut as firebaseSignOut } from 'firebase/auth';

export function UserAuth() {
  const pathname = usePathname();
  const { user } = useAuth();
  console.log('user', user);
  const router = useRouter();
  const auth = false;
  if (pathname == '/signin') {
    return null;
  }

  if (!auth) {
    return (
      <Button variant="outline" onClick={() => router.push('/signin')}>
        Sign In
      </Button>
    );
  }

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <div className="flex items-center gap-4">
      <form>
        <Button variant="outline" onClick={signOut}>
          Sign Out
        </Button>
      </form>
      <Image
        className="h-8 w-8 rounded-full"
        src={userImg}
        height={32}
        width={32}
        alt={`${userImg} avatar`}
      />
    </div>
  );
}
