// js/admin-protect.js
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js';

// Redirect to signin if not authenticated
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // assume admin pages are under /admin/ and need a higher privilege check in future
    window.location.href = '../signin.html';
  }
});
