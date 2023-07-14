import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey:process.env.API_KEY,
    projectId:process.env.PROJECT_ID,
    appId:process.env.APP_ID,
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };