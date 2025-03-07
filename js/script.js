import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL9IEmjkZQaZj8HKJLPVbmUtnjEU7NIHg",
  authDomain: "chicken-sales-system.firebaseapp.com",
  projectId: "chicken-sales-system",
  storageBucket: "chicken-sales-system.appspot.com",
  messagingSenderId: "934584744112",
  appId: "1:934584744112:web:7fda62005fb6909b17e375",
  measurementId: "G-DDWFXKZQQP"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  loginUser(email, password);
});

// Login user with Firebase
function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Login successful!");
      window.location.href = "pages/home.html"; // Redirect to home page
    })
    .catch((error) => {
      console.error("Error logging in: ", error);
      alert(error.message); // Show error message
    });
} 