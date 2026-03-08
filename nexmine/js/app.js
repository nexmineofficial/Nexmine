// NexMine App Logic (Auth & Navigation)

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    console.log("Logging in...");
    
    // Save email for dashboard
    localStorage.setItem('nexmine_user_email', email);
    
    const btn = event.target.querySelector('button[type="submit"]');
    btn.innerText = "LOGGING IN...";
    btn.disabled = true;

    setTimeout(() => {
        const currentPath = window.location.pathname;
        const directory = currentPath.substring(0, currentPath.lastIndexOf('/'));
        window.location.href = directory + "/dashboard.html";
    }, 1000);
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const mobile = document.getElementById('signup-mobile').value;
    
    // Check if user already exists (Simulated)
    const existingEmail = localStorage.getItem('nexmine_user_email');
    const existingMobile = localStorage.getItem('nexmine_mobile');
    
    if (existingEmail === email || existingMobile === mobile) {
        alert("This email or mobile number is already registered!");
        return;
    }

    console.log("Signing up...");
    
    // Save info and initial balance
    localStorage.setItem('nexmine_user_email', email);
    localStorage.setItem('nexmine_username', username);
    localStorage.setItem('nexmine_mobile', mobile);
    localStorage.setItem('nexmine_balance', '0.00');
    
    const btn = event.target.querySelector('button[type="submit"]');
    btn.innerText = "CREATING ACCOUNT...";
    btn.disabled = true;

    setTimeout(() => {
        const currentPath = window.location.pathname;
        const directory = currentPath.substring(0, currentPath.lastIndexOf('/'));
        window.location.href = directory + "/dashboard.html";
    }, 1500);
}

// Logout
function logout() {
    window.location.href = "login.html";
}

// Forgot Password (Telegram Redirect)
function forgotPassword() {
    const message = "For password recovery please contact NexMine support on Telegram. Our support team will respond within 24 hours.";
    alert(message);
    window.location.href = "https://t.me/NexMineSupport";
}
