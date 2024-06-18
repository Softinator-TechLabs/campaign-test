import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from './service-account-file.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
  });
}

const db = admin.firestore();
const auth = admin.auth();
const FieldValue = admin.firestore.FieldValue;

export { db, auth, FieldValue };
