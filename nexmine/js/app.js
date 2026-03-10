// NexMine App Logic (Auth & Navigation)

function handleLogin(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    localStorage.setItem('nexmine_user_email', email);
    const btn = event.target.querySelector('button[type="submit"]');
    btn.innerText = "LOGGING IN...";
    btn.disabled = true;
    setTimeout(() => { window.location.href = "dashboard.html"; }, 1000);
}

function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const mobile = document.getElementById('signup-mobile').value.trim();
    
    const savedUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
    
    if (savedUsers.some(u => u.username === username)) {
        alert("This username is already taken!");
        return;
    }
    if (savedUsers.some(u => u.email === email || u.mobile === mobile)) {
        alert("This email or mobile number is already registered!");
        return;
    }

    localStorage.setItem('nexmine_user_email', email);
    localStorage.setItem('nexmine_username', username);
    localStorage.setItem('nexmine_mobile', mobile);
    
    // Initial balance: 100.00 (Signup bonus)
    localStorage.setItem('nexmine_balance', "100.00");
    
    // Check for referral
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
        localStorage.setItem('nexmine_referrer', refCode);
        console.log(`Referred by: ${refCode}`);
    }

    savedUsers.push({ username, email, mobile });
    localStorage.setItem('nexmine_users_list', JSON.stringify(savedUsers));
    
    const btn = event.target.querySelector('button[type="submit"]');
    btn.innerText = "CREATING ACCOUNT...";
    btn.disabled = true;
    setTimeout(() => { window.location.href = "dashboard.html"; }, 1500);
}

function updateUsername() {
    const oldName = localStorage.getItem('nexmine_username');
    const newUsername = prompt("Enter new username:", oldName);
    if (newUsername && newUsername.trim() !== "" && newUsername !== oldName) {
        const trimmed = newUsername.trim();
        const savedUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
        if (savedUsers.some(u => u.username === trimmed)) {
            alert("This username is already taken!");
            return;
        }
        const userIndex = savedUsers.findIndex(u => u.username === oldName);
        if (userIndex !== -1) savedUsers[userIndex].username = trimmed;
        localStorage.setItem('nexmine_users_list', JSON.stringify(savedUsers));
        localStorage.setItem('nexmine_username', trimmed);
        location.reload();
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

function forgotPassword() {
    alert("Contact NexMine support on Telegram.");
    window.location.href = "https://t.me/NexMineSupport";
}
