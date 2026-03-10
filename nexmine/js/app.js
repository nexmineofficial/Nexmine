// NexMine App Logic (Auth & Navigation)

function handleLogin(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value.trim();
    
    // Find user in simulated list to get username and mobile
    const savedUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
    const user = savedUsers.find(u => u.email === email);
    
    if (user) {
        localStorage.setItem('nexmine_user_email', user.email);
        localStorage.setItem('nexmine_username', user.username);
        localStorage.setItem('nexmine_mobile', user.mobile);
    } else {
        // Fallback if not found (e.g., first time or cleared list)
        localStorage.setItem('nexmine_user_email', email);
        localStorage.setItem('nexmine_username', email.split('@')[0]);
        localStorage.setItem('nexmine_mobile', 'Not Set');
    }

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
    localStorage.setItem('nexmine_balance', "100.0000");
    
    // Check for referral
    const urlParams = new URLSearchParams(window.location.search);
    let refCode = urlParams.get('ref');
    
    // Also check manual input if URL ref is missing
    if (!refCode) {
        const manualRef = document.getElementById('signup-ref');
        if (manualRef && manualRef.value.trim() !== "") {
            refCode = manualRef.value.trim();
        }
    }

    if (refCode) {
        localStorage.setItem('nexmine_referrer', refCode);
        console.log(`Referred by: ${refCode}`);
        
        // Simulate bonus for referrer
        let refCounts = JSON.parse(localStorage.getItem('nexmine_ref_counts') || '{"l1":0,"l2":0,"l3":0,"l4":0,"l5":0}');
        refCounts.l1 += 1;
        localStorage.setItem('nexmine_ref_counts', JSON.stringify(refCounts));

        // Simulate 100 NXP signup bonus for referrer
        let signupBonus = parseFloat(localStorage.getItem('nexmine_ref_signup_bonus') || '0');
        signupBonus += 100;
        localStorage.setItem('nexmine_ref_signup_bonus', signupBonus.toFixed(8));
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
        if (userIndex !== -1) {
            savedUsers[userIndex].username = trimmed;
        } else {
            savedUsers.push({ username: trimmed, email: localStorage.getItem('nexmine_user_email'), mobile: localStorage.getItem('nexmine_mobile') });
        }
        
        localStorage.setItem('nexmine_users_list', JSON.stringify(savedUsers));
        localStorage.setItem('nexmine_username', trimmed);
        location.reload();
    }
}

function logout() {
    // Keep users list but clear session
    const usersList = localStorage.getItem('nexmine_users_list');
    localStorage.clear();
    if (usersList) localStorage.setItem('nexmine_users_list', usersList);
    window.location.href = "login.html";
}

function forgotPassword() {
    alert("Contact NexMine support on Telegram.");
    window.location.href = "https://t.me/NexMineSupport";
      }
