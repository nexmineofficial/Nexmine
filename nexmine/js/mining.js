let miningInterval;
let timeLeft = 24 * 3600;

function getBaseRewardRate() {
    const allUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
    const userCount = allUsers.length;
    if (userCount < 5000) return 1.0;
    if (userCount < 10000) return 0.5;
    if (userCount < 20000) return 0.3;
    if (userCount < 50000) return 0.2;
    return 0.1;
}

function getActiveDirectReferralsCount() {
    const username = localStorage.getItem('nexmine_username');
    const allUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
    const directReferrals = allUsers.filter(u => u.referrer === username);
    return directReferrals.filter(u => (u.username.length % 2 === 0)).length; // Simulation
}

function calculateMiningSpeed() {
    const baseRate = getBaseRewardRate();
    const activeCount = getActiveDirectReferralsCount();
    const boost = activeCount * 0.1; 
    return { base: baseRate, total: baseRate + boost };
}

function startMining() {
    const btn = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('timer-display');
    const status = document.getElementById('mining-status');
    const speedDisplay = document.getElementById('mining-speed-value');
    const baseSpeedDisplay = document.getElementById('base-speed-value');

    if (!btn || !timerDisplay || !status) return;

    btn.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    status.innerText = "Active";
    status.classList.add('text-amber-500');

    const speeds = calculateMiningSpeed();
    if (speedDisplay) speedDisplay.innerText = speeds.total.toFixed(2);
    if (baseSpeedDisplay) baseSpeedDisplay.innerText = speeds.base.toFixed(2);

    if (!localStorage.getItem('nexmine_mining_end')) {
        localStorage.setItem('nexmine_mining_end', Date.now() + (24 * 3600 * 1000));
    }

    miningInterval = setInterval(() => {
        const now = Date.now();
        const endTime = parseInt(localStorage.getItem('nexmine_mining_end'));
        if (now >= endTime) { stopMining(); return; }

        timeLeft = Math.floor((endTime - now) / 1000);
        updateTimerDisplay();
        
        const speeds = calculateMiningSpeed();
        addRewardToWallet(speeds.total / 3600);
        if (speedDisplay) speedDisplay.innerText = speeds.total.toFixed(2);
        if (baseSpeedDisplay) baseSpeedDisplay.innerText = speeds.base.toFixed(2);
    }, 1000);
}

function stopMining() {
    clearInterval(miningInterval);
    localStorage.removeItem('nexmine_mining_end');
    location.reload();
}

function updateTimerDisplay() {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    document.getElementById('timer-display').innerText = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function addRewardToWallet(amount) {
    let balance = parseFloat(localStorage.getItem('nexmine_balance') || '0');
    balance += amount;
    localStorage.setItem('nexmine_balance', balance.toFixed(8));
    document.getElementById('balance').innerText = balance.toFixed(4);
}

window.addEventListener('load', () => {
    let username = localStorage.getItem('nexmine_username');
    let userEmail = localStorage.getItem('nexmine_user_email');
    let mobile = localStorage.getItem('nexmine_mobile');

    // Robust user data loading
    if (!username || !mobile) {
        const allUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
        const user = allUsers.find(u => u.email === userEmail);
        if (user) {
            username = user.username;
            mobile = user.mobile;
            localStorage.setItem('nexmine_username', username);
            localStorage.setItem('nexmine_mobile', mobile);
        }
    }

    if (document.getElementById('user-display-name')) document.getElementById('user-display-name').innerText = username || 'User';
    if (document.getElementById('sidebar-username')) document.getElementById('sidebar-username').innerText = username || 'User';
    if (document.getElementById('sidebar-email')) document.getElementById('sidebar-email').innerText = userEmail || 'No Email';
    if (document.getElementById('sidebar-mobile')) document.getElementById('sidebar-mobile').innerText = mobile || 'Not Set';

    const speeds = calculateMiningSpeed();
    if (document.getElementById('base-speed-value')) document.getElementById('base-speed-value').innerText = speeds.base.toFixed(2);
    if (document.getElementById('mining-speed-value')) document.getElementById('mining-speed-value').innerText = speeds.total.toFixed(2);

    const endTime = localStorage.getItem('nexmine_mining_end');
    if (endTime && Date.now() < parseInt(endTime)) startMining();
});
