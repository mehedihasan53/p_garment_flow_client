import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAL30_XWz-t7trK6LlW7p06vkZB3brC5aw",
    authDomain: "garment-flow-1a84b.firebaseapp.com",
    projectId: "garment-flow-1a84b",
    storageBucket: "garment-flow-1a84b.firebasestorage.app",
    messagingSenderId: "899341385398",
    appId: "1:899341385398:web:87f94dcf010164a0257017"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);