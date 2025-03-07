 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
 import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

 function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId); // Get the actual div instead of creating a new one
  if (!messageDiv) return; // Ensure the div exists
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}


const createAccountForm = document.getElementById("createAccountForm"); // Target the form
createAccountForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
      };

      // Show success message
      showMessage("Account Created Successfully", "signUpMessage");

      // Save user data to Firestore
      const docRef = doc(db, "users", user.uid);
      return setDoc(docRef, userData);
    })
    .then(() => {
      window.location.href = "index.html"; // Redirect after successful account creation
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/email-already-in-use") {
        showMessage("Email Address Already Exists !!!", "signUpMessage");
      } else {
        showMessage("Unable to create User", "signUpMessage");
      }
    });
});
