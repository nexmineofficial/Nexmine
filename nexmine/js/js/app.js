// NexMine App Logic (Auth & Navigation)

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    console.log("Logging in...");
    
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
    console.log("Signing up...");
    
    const btn = event.target.querySelector('button[type="submit"]');
    btn.innerText = "CREATING ACCOUNT...";
    btn.disabled = true;

    setTimeout(() => {
        localStorage.setItem('nexmine_balance', '100.00');
        const currentPath = window.location.pathname;
        const directory = currentPath.substring(0, currentPath.lastIndexOf('/'));
        window.location.href = directory + "/dashboard.html";
    }, 1500);
}

// Logout
function logout() {
    window.location.href = "login.html";
}

// Forgot Password
function forgotPassword() {
    const message = "For password recovery please contact NexMine support on Telegram.";
    alert(message);
    window.location.href = "https://t.me/NexMineSupport";
}
