const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// const serviceAccount = require('../firebaseServiceAccount.json');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const app = initializeApp({
    credential: cert(serviceAccount)
});

module.exports = { admin: getAuth(app) };