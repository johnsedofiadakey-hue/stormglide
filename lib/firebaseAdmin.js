import admin from 'firebase-admin';

function getAdminApp() {
  if (admin.apps.length > 0) return admin.apps[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyB64 = process.env.FIREBASE_PRIVATE_KEY_B64;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKeyB64) {
    try {
      privateKey = Buffer.from(privateKeyB64, 'base64').toString('utf8');
    } catch (e) {
      console.error('Failed to decode Base64 private key');
    }
  }

  if (privateKey) {
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.substring(1, privateKey.length - 1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  try {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } catch (error) {
    console.error('Firebase Admin initialization failed:', error);
    return null;
  }
}

export const getDbAdmin = () => {
  const app = getAdminApp();
  return app ? admin.firestore() : null;
};
