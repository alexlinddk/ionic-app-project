// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaGJPpVabWMJofL8GZQpICRGGIgt5p3Lo",
  authDomain: "restaurants-app-2402e.firebaseapp.com",
  databaseURL: "https://restaurants-app-2402e-default-rtdb.firebaseio.com",
  projectId: "restaurants-app-2402e",
  storageBucket: "restaurants-app-2402e.appspot.com",
  messagingSenderId: "779520558011",
  appId: "1:779520558011:web:d9dbeb4605b68b11c3fa9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
export const database = getDatabase(app);

export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence
});

// Reference to reviews in Realtime DB
export const reviewsRef = ref(database, "reviews");
// Reference to users in Realtime DB
export const usersRef = ref(database, "users");
// Get reference to specific review using post id
export function getReviewRef(reviewId) {
    return ref(database, "reviews/" + reviewId);
}
// Get reference to specific user using user id
export function getUserRef(userId) {
    return ref(database, "users/" + userId);
}
export function getRestaurantRef(restaurantId) {
  return ref(database, "restaurants/" + restaurantId);
}

// Reference to the storage service
export const storage = getStorage(app);