function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const mobile = document.getElementById('signup-mobile').value.trim();
    const refCode = new URLSearchParams(window.location.search).get('ref') || document.getElementById('signup-ref').value.trim();

    const savedUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
    const newUser = { username, email, mobile, referrer: refCode || null, signupTime: Date.now() };
    
    savedUsers.push(newUser);
    localStorage.setItem('nexmine_users_list', JSON.stringify(savedUsers));
    localStorage.setItem('nexmine_user_email', email);
    localStorage.setItem('nexmine_username', username);
    localStorage.setItem('nexmine_balance', "100.0000"); // Signup bonus

    window.location.href = "dashboard.html";
}

function logout() {
    const users = localStorage.getItem('nexmine_users_list');
    localStorage.clear();
    localStorage.setItem('nexmine_users_list', users);
    window.location.href = "login.html";
}
