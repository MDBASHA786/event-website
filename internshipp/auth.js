// Firebase configuration (replace with your own Firebase config)
var firebaseConfig = {
        apiKey: "AIzaSyBR8m4CVU3BlYIbFgCLb_pRqzDo9MIRtPc",
        authDomain: "icon-7c304.firebaseapp.com",
        projectId: "icon-7c304",
        storageBucket: "icon-7c304.appspot.com",
        messagingSenderId: "851619965060",
        appId: "1:851619965060:web:fa0c2d097ba9d832677ad1",
      };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
    const signInButton = document.getElementById('signInButton');

    // Check the user's authentication state
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in, change the sign-in button text to "Welcome!"
            if (signInButton) {
                signInButton.innerHTML = 'Welcome!';
                signInButton.classList.add('sign-in-success');
                signInButton.href = '#'; // Prevents navigating away
            }
        } else {
            // No user is signed in, keep the button as "Sign In"
            if (signInButton) {
                signInButton.innerHTML = 'Sign In';
                signInButton.href = 'register/signin.html';
            }
        }
    });

    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = signUpForm.querySelector('input[placeholder="Name"]').value;
            const email = signUpForm.querySelector('input[placeholder="Email"]').value;
            const password = signUpForm.querySelector('input[placeholder="Password"]').value;
            addUser(name, email, password);
        });
    }

    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = signInForm.querySelector('input[placeholder="Email"]').value;
            const password = signInForm.querySelector('input[placeholder="Password"]').value;
            signInUser(email, password);
        });
    }
});

function addUser(name, email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return db.collection('users').doc(user.uid).set({
                name: name,
                email: email
            });
        })
        .then(() => {
            alert('User created successfully!');
            window.location.href = '../int.html';
        })
        .catch((error) => {
            console.error('Error adding user:', error);
            alert(`Error: ${error.message}`);
        });
}

function signInUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Signed in successfully!');
            window.location.href = '../int.html';
        })
        .catch((error) => {
            console.error('Error signing in user:', error);
            alert(`Error: ${error.message}`);
        });
}
