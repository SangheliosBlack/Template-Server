import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class NotificationService {
  constructor() {
    this.initFirebase();
  }

  initFirebase() {
    if (admin.apps.length === 0) {
      const serviceAccountPath = path.join(
        process.cwd(),
        'keys/flutter-template-b03c3-firebase_admin_sdk.json'
      );

      const decoded = Buffer.from(process.env.FIREBASE_KEY_B64, 'base64').toString('utf-8');
      
      const serviceAccount = JSON.parse(decoded);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      console.log('✅ Firebase Admin Initialized');
    }
  }

  async sendPushToOneUser(mensaje) {
    
    if (!mensaje.tokenId) {
      throw new Error('Token ID is required');
    }

    const message = {
      token: mensaje.tokenId,
      notification: {
        title: mensaje.title,
        body: mensaje.message,
      },
      android: {
        ttl: 2419200,
        priority: 'high',
        notification: {
          channel_id: 'general_id',
          sound: 'default',
        },
      },
    };

    return this.sendMessage(message);
  }

  async sendMessage(message) {

    try {

      const response = await admin.messaging().send(message);

      console.log('✅ Message sent:', response);

      return response;

    } catch (error) {

      console.error('❌ Error sending message:', error);

      throw error;

    }

  }

}

export default new NotificationService();
