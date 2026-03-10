// NexMine App Logic (Auth & Navigation)

function handleLogin(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value.trim();
    const savedUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
    const user = savedUsers.find(u => u.email === email);
    
    if (user) {
        localStorage.setItem('nexmine_user_email', user.email);
        localStorage.setItem('nexmine_username', user.username);
        localStorage.setItem('nexmine_mobile', user.mobile);
    } else {
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
    if (savedUsers.some(u => u.username === username)) { alert("Username taken!"); return; }
    if (savedUsers.some(u => u.email === email || u.mobile === mobile)) { alert("Email/Mobile taken!"); return; }

    localStorage.setItem('nexmine_user_email', email);
    localStorage.setItem('nexmine_username', username);
    localStorage.setItem('nexmine_mobile', mobile);
    localStorage.setItem('nexmine_balance', "100.0000");
    
    const urlParams = new URLSearchParams(window.location.search);
    let refCode = urlParams.get('ref');
    if (!refCode) {
        const manualRef = document.getElementById('signup-ref');
        if (manualRef && manualRef.value.trim() !== "") refCode = manualRef.value.trim();
    }

    if (refCode) {
        localStorage.setItem('nexmine_referrer', refCode);
        let refCounts = JSON.parse(localStorage.getItem('nexmine_ref_counts') || '{"l1":0,"l2":0,"l3":0,"l4":0,"l5":0}');
        refCounts.l1 += 1;
        localStorage.setItem('nexmine_ref_counts', JSON.stringify(refCounts));
    }

    savedUsers.push({ username, email, mobile });
    localStorage.setItem('nexmine_users_list', JSON.stringify(savedUsers));
    window.location.href = "dashboard.html";
}

function updateUsername() {
    const oldName = localStorage.getItem('nexmine_username');
    const newUsername = prompt("Enter new username:", oldName);
    if (newUsername && newUsername.trim() !== "" && newUsername !== oldName) {
        const trimmed = newUsername.trim();
        const savedUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
        if (savedUsers.some(u => u.username === trimmed)) { alert("Username taken!"); return; }
        const userIndex = savedUsers.findIndex(u => u.username === oldName);
        if (userIndex !== -1) savedUsers[userIndex].username = trimmed;
        localStorage.setItem('nexmine_username', trimmed);
        localStorage.setItem('nexmine_users_list', JSON.stringify(savedUsers));
        location.reload();
    }
}

function logout() {
    const usersList = localStorage.getItem('nexmine_users_list');
    localStorage.clear();
    if (usersList) localStorage.setItem('nexmine_users_list', usersList);
    window.location.href = "login.html";
                             }
