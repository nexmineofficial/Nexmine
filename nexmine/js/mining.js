// NexMine Mining Timer Logic

let miningInterval;
let timeLeft = 24 * 3600; // 24 hours in seconds
const REWARD_RATE = 0.5; // NXP per hour

function startMining() {
    const btn = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('timer-display');
    const status = document.getElementById('mining-status');

    // 1. Start Mining Timer
    btn.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    status.innerText = "Active";
    status.classList.remove('text-white/60');
    status.classList.add('text-amber-500');

    // 2. Timer runs for 24 hours
    miningInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            stopMining();
        }
    }, 1000);

    // Save state to localStorage
    const endTime = Date.now() + (timeLeft * 1000);
    localStorage.setItem('nexmine_mining_end', endTime);
}

function stopMining() {
    clearInterval(miningInterval);
    const btn = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('timer-display');
    const status = document.getElementById('mining-status');

    btn.classList.remove('hidden');
    timerDisplay.classList.add('hidden');
    status.innerText = "Inactive";
    status.classList.add('text-white/60');
    status.classList.remove('text-amber-500');

    // 3. Reward is calculated
    const reward = REWARD_RATE * 24;

    // 4. Reward added to wallet automatically
    addRewardToWallet(reward);
    
    timeLeft = 24 * 3600;
    localStorage.removeItem('nexmine_mining_end');
}

function updateTimerDisplay() {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    
    const display = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    document.getElementById('timer-display').innerText = display;
}

function addRewardToWallet(amount) {
    const balanceEl = document.getElementById('balance');
    let currentBalance = parseFloat(balanceEl.innerText.replace(',', ''));
    currentBalance += amount;
    balanceEl.innerText = currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 });
    
    // Sync with Firebase (Pseudo-code)
    // db.collection('users').doc(userId).update({ balance_nxp: currentBalance });
}

// Check for existing mining session on load
window.onload = () => {
    const endTime = localStorage.getItem('nexmine_mining_end');
    if (endTime) {
        const now = Date.now();
        if (now < endTime) {
            timeLeft = Math.floor((endTime - now) / 1000);
            startMining();
        } else {
            stopMining();
        }
    }
};
