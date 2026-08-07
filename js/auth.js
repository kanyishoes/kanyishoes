// js/auth.js
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js';

// Basic auth helpers used across the site
async function handleSignup(e) {
  e && e.preventDefault();
  const form = document.getElementById('signupForm');
  if (!form) return;
  const email = form.querySelector('#signupEmail').value.trim();
  const password = form.querySelector('#signupPassword').value;
  const name = form.querySelector('#signupName')?.value?.trim() || '';

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    // store basic profile in firestore
    await setDoc(doc(db, 'users', userCred.user.uid), {
      email,
      name,
      createdAt: new Date().toISOString()
    });
    // redirect to profile or home
    window.location.href = 'profile.html';
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
}

async function handleSignin(e) {
  e && e.preventDefault();
  const form = document.getElementById('signinForm');
  if (!form) return;
  const email = form.querySelector('#signinEmail').value.trim();
  const password = form.querySelector('#signinPassword').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'index.html';
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
}

export async function logout() {
  try {
    await fbSignOut(auth);
    // after sign out, send user to signin page
    window.location.href = 'signin.html';
  } catch (err) {
    console.error('Sign-out error', err);
  }
}

function insertAuthLink() {
  // try to find a good header container to attach auth link/button
  const headerContainer = document.querySelector('header .max-w-7xl') || document.querySelector('header');
  if (!headerContainer) return;

  // avoid duplicating
  if (document.getElementById('authLink')) return;

  const a = document.createElement('a');
  a.id = 'authLink';
  a.className = 'ml-4 text-blue-900 font-semibold hover:underline';
  a.style.cursor = 'pointer';
  // default state
  a.textContent = 'Sign in';
  headerContainer.appendChild(a);
}

function updateAuthLink(user) {
  const a = document.getElementById('authLink');
  if (!a) return;
  if (user) {
    a.textContent = 'Logout';
    a.onclick = (e) => {
      e.preventDefault();
      logout();
    };
    a.href = '#';
  } else {
    a.textContent = 'Sign in';
    a.onclick = null;
    // choose a sensible signin page relative to current location
    a.href = (location.pathname.includes('/admin/')) ? '../signin.html' : 'signin.html';
  }
}

// Attach form handlers (if pages include the forms)
function initFormHandlers() {
  const signupForm = document.getElementById('signupForm');
  if (signupForm) signupForm.addEventListener('submit', handleSignup);

  const signinForm = document.getElementById('signinForm');
  if (signinForm) signinForm.addEventListener('submit', handleSignin);
}

// watch auth state
onAuthStateChanged(auth, (user) => {
  insertAuthLink();
  updateAuthLink(user);
});

// run on load
window.addEventListener('DOMContentLoaded', () => {
  insertAuthLink();
  initFormHandlers();
});
