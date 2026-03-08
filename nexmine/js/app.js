// NexMine App Logic (Auth & Navigation)

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
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
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Save email and initial bonus balance
    localStorage.setItem('nexmine_user_email', email);
    localStorage.setItem('nexmine_balance', '100.00');
    
    const btn = event.target.querySelector('button[type="submit"]');
    btn.innerText = "CREATING ACCOUNT...";
    btn.disabled = true;

    setTimeout(() => {
        const currentPath = window.location.pathname;
        const directory = currentPath.substring(0, currentPath.lastIndexOf('/'));
        window.location.href = directory + "/dashboard.html";
    }, 1500);
}

function logout() {
    window.location.href = "login.html";
}

function forgotPassword() {
    alert("Please contact NexMine support on Telegram for password recovery.");
    window.location.href = "https://t.me/NexMineSupport";
}
