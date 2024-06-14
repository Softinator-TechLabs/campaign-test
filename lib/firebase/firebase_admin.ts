const admin = require('firebase-admin');
const serviceAccount = require('./service-account-file.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE
  });
}

module.exports = admin;
