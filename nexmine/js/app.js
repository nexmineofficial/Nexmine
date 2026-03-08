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
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const mobile = document.getElementById('signup-mobile').value.trim();
    
    // Check if user already exists (Simulated)
    const savedUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
    
    if (savedUsers.some(u => u.username === username)) {
        alert("This username is already taken! Please choose another.");
        return;
    }
    if (savedUsers.some(u => u.email === email || u.mobile === mobile)) {
        alert("This email or mobile number is already registered!");
        return;
    }

    console.log("Signing up...");
    
    // Save info
    localStorage.setItem('nexmine_user_email', email);
    localStorage.setItem('nexmine_username', username);
    localStorage.setItem('nexmine_mobile', mobile);
    
    // Initial balance
    localStorage.setItem('nexmine_balance', '0.00');
    
    // Add to users list for unique check simulation
    savedUsers.push({ username, email, mobile });
    localStorage.setItem('nexmine_users_list', JSON.stringify(savedUsers));
    
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

// Forgot Password
function forgotPassword() {
    alert("For password recovery please contact NexMine support on Telegram.");
    window.location.href = "https://t.me/NexMineSupport";
    }
