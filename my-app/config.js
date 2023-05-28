// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // databaseURL: "https://project-id.firebaseio.com",
  // measurementId: "G-measurement-id",

  apiKey: 'AIzaSyC-2Oeef6ciTb65JNZzkCa5Fuviz1x3FrA',
  authDomain: "goit-react-native-75a81.firebaseapp.com",
  projectId: "goit-react-native-75a81",
  storageBucket: "goit-react-native-75a81.appspot.com",
  messagingSenderId: "575036935873",
  appId: "1:575036935873:web:8a61abfe3eec529c6c8e40",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
