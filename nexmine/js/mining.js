// NexMine Mining & Referral Logic
let miningInterval;
let timeLeft = 24 * 3600; // 24 hours in seconds

const BASE_REWARD_RATE_PER_HOUR = 1.0;

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
    const activeReferrals = directReferrals.filter(u => (u.username.length % 2 === 0)); // Simulated active status
    return activeReferrals.length;
}

function calculateMiningSpeed() {
    const baseRate = getBaseRewardRate();
    const activeCount = getActiveDirectReferralsCount();
    const boost = activeCount * 0.1; // 10% boost per active direct referral
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
    status.classList.remove('text-white/40');
    status.classList.add('text-amber-500');

    const speeds = calculateMiningSpeed();
    if (speedDisplay) speedDisplay.innerText = speeds.total.toFixed(2);
    if (baseSpeedDisplay) baseSpeedDisplay.innerText = speeds.base.toFixed(2);

    if (!localStorage.getItem('nexmine_mining_end')) {
        timeLeft = 24 * 3600;
        const endTime = Date.now() + (timeLeft * 1000);
        localStorage.setItem('nexmine_mining_end', endTime);
        localStorage.setItem('nexmine_last_reward_time', Date.now().toString());
    }

    if (miningInterval) clearInterval(miningInterval);
    let lastTick = Date.now();
    miningInterval = setInterval(() => {
        const now = Date.now();
        const endTime = parseInt(localStorage.getItem('nexmine_mining_end') || '0');
        if (now >= endTime) { stopMining(); return; }

        const delta = (now - lastTick) / 1000;
        lastTick = now;
        timeLeft = Math.floor((endTime - now) / 1000);
        updateTimerDisplay();
        
        const speeds = calculateMiningSpeed();
        const reward = (speeds.total / 3600) * delta;
        addRewardToWallet(reward);
    }, 1000);
}

function stopMining() {
    clearInterval(miningInterval);
    const btn = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('timer-display');
    const status = document.getElementById('mining-status');
    if (btn) btn.classList.remove('hidden');
    if (timerDisplay) timerDisplay.classList.add('hidden');
    if (status) {
        status.innerText = "Inactive";
        status.classList.add('text-white/40');
        status.classList.remove('text-amber-500');
    }
    localStorage.removeItem('nexmine_mining_end');
    localStorage.removeItem('nexmine_last_reward_time');
}

function addRewardToWallet(amount) {
    let balance = parseFloat(localStorage.getItem('nexmine_balance') || '0');
    balance += amount;
    localStorage.setItem('nexmine_balance', balance.toFixed(8));
    localStorage.setItem('nexmine_last_reward_time', Date.now().toString());
    if (document.getElementById('balance')) document.getElementById('balance').innerText = balance.toFixed(6);
}

function updateTimerDisplay() {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    const display = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    const timerEl = document.getElementById('timer-display');
    if (timerEl) timerEl.innerText = display;
}

// ... (Referral UI and Link functions remain as implemented)
