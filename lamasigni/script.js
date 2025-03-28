// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3nt8aHCm5LH60SyBH6MSYHpLBUtcqZrw",
    authDomain: "lama-68c61.firebaseapp.com",
    projectId: "lama-68c61",
    storageBucket: "lama-68c61.firebasestorage.app",
    messagingSenderId: "620875338283",
    appId: "1:620875338283:web:dc779e3e11d4a52da6906e",
    measurementId: "G-F77738ELVK"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const gradientBg = document.querySelector('.gradient-bg');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    // Form switching
    loginBtn.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    });

    signupBtn.addEventListener('click', () => {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
    });

    // Mouse move gradient effect
    document.addEventListener('mousemove', (e) => {
        gradientBg.style.left = `${e.clientX - 250}px`;
        gradientBg.style.top = `${e.clientY - 250}px`;
    });

    // Forgot Password functionality
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        
        if (!email) {
            alert('Please enter your email address first');
            return;
        }
        
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('Password reset email sent! Please check your inbox and spam folder.');
            })
            .catch((error) => {
                let errorMessage = error.message;
                if (error.code === 'auth/user-not-found') {
                    errorMessage = 'No account found with this email address';
                }
                alert('Error: ' + errorMessage);
            });
    });

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        // Show loading state
        const submitBtn = loginForm.querySelector('.btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;
        
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                alert('Login successful!');
                // Redirect to dashboard or another page
                // window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                let errorMessage = error.message;
                if (error.code === 'auth/wrong-password') {
                    errorMessage = 'Incorrect password. Please try again or use "Forgot Password"';
                } else if (error.code === 'auth/user-not-found') {
                    errorMessage = 'No account found with this email address';
                }
                alert(errorMessage);
            })
            .finally(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });

    // Signup form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = signupForm.querySelector('input[type="text"]').value.trim();
        const email = signupForm.querySelector('input[type="email"]').value.trim();
        const password = signupForm.querySelector('input[type="password"]').value;
        
        // Show loading state
        const submitBtn = signupForm.querySelector('.btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Creating account...';
        submitBtn.disabled = true;
        
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return user.updateProfile({
                    displayName: username
                });
            })
            .then(() => {
                alert('Account created successfully! Welcome, ' + username + '!');
                // Redirect to dashboard or another page
                window.location.href = 'https://inkoradev.github.io/meowx/beryl.html';
            })
            .catch((error) => {
                let errorMessage = error.message;
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = 'This email is already registered. Please login instead.';
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = 'Password should be at least 6 characters';
                }
                alert(errorMessage);
            })
            .finally(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });

    // Auth state observer
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            console.log('User is logged in:', user);
            // You can redirect here if you want
            window.location.href = 'https://inkoradev.github.io/meowx/beryl.html';
        } else {
            // User is signed out
            console.log('User is logged out');
        }
    });
});
