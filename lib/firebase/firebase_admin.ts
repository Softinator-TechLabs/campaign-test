import admin from 'firebase-admin';
import serviceAccount from './service-account-file.json';

// Ensure the correct type for the service account
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE
  });
}

const db = admin.firestore();
export { db, admin };
