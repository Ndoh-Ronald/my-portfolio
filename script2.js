
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13/firebase-auth.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyAIc3J6hLq2RnGYoCvOBLYBnloBTZRniXs",
   authDomain: "myportfolio-71eb5.firebaseapp.com",
   projectId: "myportfolio-71eb5",
   storageBucket: "myportfolio-71eb5.appspot.com",
   messagingSenderId: "138311948365",
   appId: "1:138311948365:web:62942d36f5ca59b7586404",
   measurementId: "G-MNZ3TTFWSK"
 };



 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
const register = document.getElementById("submit");
const auth = getAuth();

register.addEventListener("click", (e) => { 
    event.preventDefault();
    // const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    alert(email)
    const password = document.getElementById("password").value;
    console.log(email, password)

    
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("logged in successful")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode)
    console.log(errorMessage)

    // ..
  });
  console.log(email, password);
  window.location.href= "main.html"

})
