const admin = require("firebase-admin");


const serviceAccount = {
    type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id.replace(/\\n/g, '\n'),
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain
  };
  
  // Initialize Firebase Admin SDK if not already initialized
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  
  module.exports = admin;


const db = admin.firestore();


module.exports = db; 
// module.exports.admin = admin;