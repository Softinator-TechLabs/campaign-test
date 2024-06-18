import { db, auth } from '@/lib/firebase/firebase_admin';

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
  // try {
  //   // Create the user
  //   const userRecord = await auth.createUser({
  //     email: 'ananddudi124@gmail.com',
  //     password: 'anand_dudi123',
  //     displayName: 'anand value dudi'
  //   });

  //   console.log('User created successfully:', userRecord);

  //   // Set custom claims
  //   await auth.setCustomUserClaims(userRecord.uid, { admin: true });

  //   console.log(`Set admin claim for user: ${userRecord.uid}`);

  //   // Store user in Firestore
  //   await db.collection('users').doc(userRecord.uid).set({
  //     email: userRecord.email,
  //     displayName: userRecord.displayName,
  //     admin: true
  //   });

  //   console.log('User stored in Firestore:', userRecord.uid);
  // } catch (error: any) {
  //   console.error('Error creating new user:', error);
  // }

  try {
    const campaignCollection = db.collection('campaigns');
    const snapshot = await campaignCollection.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    const campaigns: any[] = [];
    snapshot.forEach((doc) => {
      campaigns.push({ id: doc.id, ...doc.data() });
    });

    console.log('Campaigns:', campaigns);
  } catch (error) {
    console.error('Error getting documents:', error);
  }

  // auth
  //   .getUserByEmail('anand@softinator.com')
  //   .then((userRecord) => {
  //     return auth.updateUser(userRecord.uid, {
  //       password: 'ananddudi'
  //     });
  //   })
  //   .then((userRecord) => {
  //     console.log('Successfully updated user:', userRecord.toJSON());
  //   })
  //   .catch((error) => {
  //     console.error('Error updating user:', error);
  //   });
  return Response.json({});
}

// Campaigns: [
//   {
//     id: 'tGK9zsJDumr47Nx7Gmoo',
//     compaignName: 'Test',
//     delivery: 'Online',
//     ticketNotComplete: false,
//     ticketNotAssign: false,
//     tamplateId: '',
//     orderUnpaid: false,
//     noAccount: false,
//     ticketType: 'Talks',
//     type: 'ticket',
//     totalCount: 248
//   }
// ];

// Campaign: [
//   {
//     id: '9idyQdSFW4T87Psw0Mle',
//     name: 'final',
//     selectedTicket: 'Ticket',
//     selectedTemplate: 'Automation - chaseTicketAssignedNoDetails',
//     filterOptions: {
//       TicketNotAssigned: false,
//       delivery: [Array],
//       selectedTicketType: 'Talks + Workshops',
//       ticketType: [Array],
//       ticketNotCompleted: true,
//       OrderUnpaid: false,
//       selectedDelivery: 'Online',
//       noAccout: true
//     },
//     status: 'In-Progress'
//   }
// ];

// User created successfully: UserRecord {
//   uid: 'm8lqyFamfccBCyt5y1e71rbJp2E2',
//   email: 'ananddudi124@gmail.com',
//   emailVerified: false,
//   displayName: 'anand value dudi',
//   photoURL: undefined,
//   phoneNumber: undefined,
//   disabled: false,
//   metadata: UserMetadata {
//     creationTime: 'Tue, 18 Jun 2024 06:46:33 GMT',
//     lastSignInTime: null,
//     lastRefreshTime: null
//   },
//   providerData: [
//     UserInfo {
//       uid: 'ananddudi124@gmail.com',
//       displayName: 'anand value dudi',
//       email: 'ananddudi124@gmail.com',
//       photoURL: undefined,
//       providerId: 'password',
//       phoneNumber: undefined
//     }
//   ],
//   passwordHash: undefined,
//   passwordSalt: undefined,
//   tokensValidAfterTime: 'Tue, 18 Jun 2024 06:46:33 GMT',
//   tenantId: undefined
// }
// Set admin claim for user: m8lqyFamfccBCyt5y1e71rbJp2E2
