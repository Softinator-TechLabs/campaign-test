'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/lib/firebase/firebase_client';
import { FormState } from './page';

const signIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export async function handleSignin(prev: FormState, formdata: FormData) {
  try {
    const emailEntry = formdata.get('email');
    const passwordEntry = formdata.get('password');

    if (typeof emailEntry === 'string' && typeof passwordEntry === 'string') {
      await signIn(emailEntry, passwordEntry);
      return {
        error: false,
        message: 'success'
      };
    } else {
      return {
        error: true,
        message: 'Invalid form data'
      };
    }
  } catch (error: any) {
    return {
      error: true,
      message: error.message
    };
  }
}
