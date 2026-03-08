// NexMine Mining Timer Logic
let miningInterval;
let timeLeft = 24 * 3600; 
const REWARD_RATE_PER_SEC = 0.5 / 3600; // 0.5 NXP per hour

function startMining() {
    const btn = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('timer-display');
    const status = document.getElementById('mining-status');

    if (!btn || !timerDisplay || !status) return;

    btn.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    status.innerText = "Active";
    status.classList.add('text-amber-500');

    if (miningInterval) clearInterval(miningInterval);
    miningInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        addRewardToWallet(REWARD_RATE_PER_SEC); // Real-time update

        if (timeLeft <= 0) stopMining();
    }, 1000);

    const endTime = Date.now() + (timeLeft * 1000);
    localStorage.setItem('nexmine_mining_end', endTime);
}

function stopMining() {
    clearInterval(miningInterval);
    location.reload(); // Refresh to reset UI
    localStorage.removeItem('nexmine_mining_end');
}

function updateTimerDisplay() {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    document.getElementById('timer-display').innerText = 
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function addRewardToWallet(amount) {
    const balanceEl = document.getElementById('balance');
    let currentBalance = parseFloat(localStorage.getItem('nexmine_balance') || '0');
    currentBalance += amount;
    localStorage.setItem('nexmine_balance', currentBalance.toFixed(8));
    balanceEl.innerText = currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

window.addEventListener('load', () => {
    // Set Email
    const email = localStorage.getItem('nexmine_user_email');
    if (email) document.getElementById('user-email').innerText = email;

    // Set Balance
    const balance = localStorage.getItem('nexmine_balance') || '0.00';
    document.getElementById('balance').innerText = parseFloat(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Resume Mining
    const endTime = localStorage.getItem('nexmine_mining_end');
    if (endTime) {
        const now = Date.now();
        if (now < endTime) {
            timeLeft = Math.floor((endTime - now) / 1000);
            startMining();
        }
    }
});
