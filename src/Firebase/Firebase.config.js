import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkc48UXoJUD83owcNoj_fR59bvqbdV0nM",
  authDomain: "shop-ba184.firebaseapp.com",
  projectId: "shop-ba184",
  storageBucket: "shop-ba184.appspot.com",
  messagingSenderId: "569722685215",
  appId: "1:569722685215:web:f03a6f9fa4ee8e2e5e122a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);