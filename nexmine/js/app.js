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
    
    // Initial balance: 100.00 (Signup bonus)
    let initialBalance = 100.00;
    
    // Check for referral bonus (Simulated)
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
        // Referrer gets 100 NXP bonus
        console.log(`User referred by: ${refCode}. Referrer awarded 100 NXP bonus.`);
    }

    localStorage.setItem('nexmine_balance', initialBalance.toFixed(2));
    
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

// Update Username
function updateUsername() {
    const newUsername = prompt("Enter new username:", localStorage.getItem('nexmine_username'));
    if (newUsername && newUsername.trim() !== "") {
        const trimmed = newUsername.trim();
        const savedUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
        
        if (savedUsers.some(u => u.username === trimmed && u.username !== localStorage.getItem('nexmine_username'))) {
            alert("This username is already taken!");
            return;
        }

        // Update in list
        const oldUsername = localStorage.getItem('nexmine_username');
        const userIndex = savedUsers.findIndex(u => u.username === oldUsername);
        if (userIndex !== -1) {
            savedUsers[userIndex].username = trimmed;
            localStorage.setItem('nexmine_users_list', JSON.stringify(savedUsers));
        }

        localStorage.setItem('nexmine_username', trimmed);
        location.reload();
    }
}

// Logout
function logout() {
    window.location.href = "login.html";
}

// Forgot Password
function forgotPassword() {
    const message = "For password recovery please contact NexMine support on Telegram. Our support team will respond within 24 hours.";
    alert(message);
    window.location.href = "https://t.me/NexMineSupport";
                             }
