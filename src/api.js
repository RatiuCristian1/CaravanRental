import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    documentId
} from "firebase/firestore/lite"
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL7tqTi60gNbWxSFTs1aOUrzVZ-1QZ7sA",
  authDomain: "caravans-2f2f4.firebaseapp.com",
  projectId: "caravans-2f2f4",
  storageBucket: "caravans-2f2f4.appspot.com",
  messagingSenderId: "284142698880",
  appId: "1:284142698880:web:923a5a7db21ee6b32e8165"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app);

export { db };

export async function getVan(id) {
  const docRef = doc(db, "caravans", id)
  const snapshot = await getDoc(docRef)
  const caravanData = snapshot.data();
  
  // Check if there's an imagePath property
  if (caravanData.imagePath) {
      const imageRef = ref(storage, caravanData.imagePath);

      try {
          const imageUrl = await getDownloadURL(imageRef);
          return { ...caravanData, id: snapshot.id, imageUrl };
      } catch (error) {
          console.error('Error fetching image URL:', error);
      }
  }

  return { ...caravanData, id: snapshot.id };
}

export async function loginUser(creds) {
  const res = await fetch("/api/login",
      { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }

  return data
}