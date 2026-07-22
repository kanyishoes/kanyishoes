import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyDGpgx9033X1K_UiodxLsT3J5lKB4hQTJc",

    authDomain: "kanye-series.firebaseapp.com",

    projectId: "kanye-series",

    storageBucket: "kanye-series.firebasestorage.app",

    messagingSenderId: "518877515683",

    appId: "1:518877515683:web:672b69c89fe89a882fd416"

};
import { getFirestore } from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
export const db = getFirestore(app);