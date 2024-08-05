import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTJn_yYozak8J6BNdatkbRIvdoQPeqmco",
  authDomain: "ridebuddy-2334b.firebaseapp.com",
  projectId: "ridebuddy-2334b",
  storageBucket: "ridebuddy-2334b.appspot.com",
  messagingSenderId: "1051735886466",
  appId: "1:1051735886466:web:80eb2ddaa17223ae7f429b",
  measurementId: "G-M9CQJ9XL2F",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
