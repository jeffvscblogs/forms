document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const gradientBg = document.querySelector('.gradient-bg');

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

    // Form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // mamamiya  Add the form submission logic here
            alert('Form submitted!');
        });
    });
});