import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

import {firebaseConfig} from './firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db }
