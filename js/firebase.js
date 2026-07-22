import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "kanye-series.firebaseapp.com",

    projectId: "kanye-series",

    storageBucket: "kanye-series.firebasestorage.app",

    messagingSenderId: "518877515683",

    appId: "YOUR_APP_ID"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
