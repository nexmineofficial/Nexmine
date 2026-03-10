let miningInterval;
let timeLeft = 24 * 3600;
const BASE_REWARD_RATE_PER_HOUR = 1.0;

function getActiveDirectReferralsCount() {
    const username = localStorage.getItem('nexmine_username');
    const allUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
    const directReferrals = allUsers.filter(u => u.referrer === username);
    return directReferrals.filter(u => (u.username.length % 2 === 0)).length; // Simulation
}

function calculateMiningSpeed() {
    return BASE_REWARD_RATE_PER_HOUR + (getActiveDirectReferralsCount() * 0.1);
}

function startMining() {
    const btn = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('timer-display');
    const status = document.getElementById('mining-status');
    const speedDisplay = document.getElementById('mining-speed-value');

    btn.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    status.innerText = "Active";
    status.classList.add('text-amber-500');

    if (!localStorage.getItem('nexmine_mining_end')) {
        localStorage.setItem('nexmine_mining_end', Date.now() + (24 * 3600 * 1000));
    }

    miningInterval = setInterval(() => {
        const now = Date.now();
        const endTime = parseInt(localStorage.getItem('nexmine_mining_end'));
        if (now >= endTime) { stopMining(); return; }

        timeLeft = Math.floor((endTime - now) / 1000);
        updateTimerDisplay();
        
        const speed = calculateMiningSpeed();
        addRewardToWallet(speed / 3600);
        if (speedDisplay) speedDisplay.innerText = speed.toFixed(2);
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
    
    const referrer = localStorage.getItem('nexmine_referrer');
    if (referrer) {
        let refEarnings = parseFloat(localStorage.getItem('nexmine_ref_earnings') || '0');
        refEarnings += (amount * 0.21);
        localStorage.setItem('nexmine_ref_earnings', refEarnings.toFixed(8));
    }
}

function generateReferralLink() {
    const username = localStorage.getItem('nexmine_username');
    const link = `${window.location.origin}/signup.html?ref=${username}`;
    if(document.getElementById('ref-link')) document.getElementById('ref-link').value = link;
}

function copyRefLink(e) {
    const input = document.getElementById('ref-link');
    input.select();
    navigator.clipboard.writeText(input.value);
    e.target.innerText = "COPIED!";
    setTimeout(() => e.target.innerText = "COPY", 2000);
}

window.onload = () => {
    generateReferralLink();
    const endTime = localStorage.getItem('nexmine_mining_end');
    if (endTime && Date.now() < parseInt(endTime)) startMining();
};
