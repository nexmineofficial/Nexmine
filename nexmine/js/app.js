// NexMine App Logic (Auth & Navigation)

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    localStorage.setItem('nexmine_user_email', email);
    
    const btn = event.target.querySelector('button[type="submit"]');
    btn.innerText = "LOGGING IN...";
    btn.disabled = true;

    setTimeout(() => {
        window.location.href = "dashboard.html";
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

    // Save info
    localStorage.setItem('nexmine_user_email', email);
    localStorage.setItem('nexmine_username', username);
    localStorage.setItem('nexmine_mobile', mobile);
    localStorage.setItem('nexmine_balance', '0.00');
    
    const btn = event.target.querySelector('button[type="submit"]');
    btn.innerText = "CREATING ACCOUNT...";
    btn.disabled = true;

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1500);
}

function logout() {
    window.location.href = "login.html";
}

function forgotPassword() {
    const message = "For password recovery please contact NexMine support on Telegram.";
    alert(message);
    window.location.href = "https://t.me/NexMineSupport";
}
