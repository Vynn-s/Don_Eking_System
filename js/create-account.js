import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL9IEmjkZQaZj8HKJLPVbmUtnjEU7NIHg",
  authDomain: "chicken-sales-system.firebaseapp.com",
  projectId: "chicken-sales-system",
  storageBucket: "chicken-sales-system.firebasestorage.app",
  messagingSenderId: "934584744112",
  appId: "1:934584744112:web:7fda62005fb6909b17e375",
  measurementId: "G-DDWFXKZQQP"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

// Handle form submission
document.getElementById('createAccountForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  registerUser(firstName, lastName, email, password);
});

// Register user with Firebase
function registerUser(firstName, lastName, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save additional user data to Realtime Database
      set(ref(db, 'users/' + user.uid), {
        firstname: firstName,
        lastname: lastName,
        email: email
      });

      alert("Account created successfully!");
      window.location.href = "../index.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Error registering user: ", error);
      alert(error.message); // Show error message
    });
}