'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import userImg from '@/public/images/user-image.jpg';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase_client';

export function UserAuth() {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();
  if (pathname == '/signin') {
    return null;
  }

  if (!user) {
    return (
      <Button variant="outline" onClick={() => router.push('/signin')}>
        Sign In
      </Button>
    );
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      document.cookie = 'token=; path=/; max-age=0';
      router.push('/signin');
      router.refresh();
    } catch (error) {
      console.log('error signing out');
    }
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
