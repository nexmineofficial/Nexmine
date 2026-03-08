let miningInterval;
let timeLeft = 24 * 3600;
const REWARD_RATE_PER_SEC = 1.0 / 3600;

function startMining() {
    console.log("Starting 24h mining session...");
    const btn = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('timer-display');
    const status = document.getElementById('mining-status');

    if (!btn || !timerDisplay || !status) return;

    btn.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    status.innerText = "Active";
    status.classList.add('text-amber-500');

    if (!localStorage.getItem('nexmine_mining_end')) {
        timeLeft = 24 * 3600;
        const endTime = Date.now() + (timeLeft * 1000);
        localStorage.setItem('nexmine_mining_end', endTime);
    }

    if (miningInterval) clearInterval(miningInterval);
    miningInterval = setInterval(() => {
        const now = Date.now();
        const endTime = parseInt(localStorage.getItem('nexmine_mining_end') || '0');
        
        if (now >= endTime) {
            stopMining();
            return;
        }

        timeLeft = Math.floor((endTime - now) / 1000);
        updateTimerDisplay();
        addRewardToWallet(REWARD_RATE_PER_SEC);
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
    const display = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    document.getElementById('timer-display').innerText = display;
}

function addRewardToWallet(amount) {
    let currentBalance = parseFloat(localStorage.getItem('nexmine_balance') || '0');
    currentBalance += amount;
    localStorage.setItem('nexmine_balance', currentBalance.toFixed(8));
    document.getElementById('balance').innerText = currentBalance.toFixed(2);
}

function generateReferralLink() {
    const username = localStorage.getItem('nexmine_username') || 'user';
    const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
    const fullLink = `${baseUrl}/signup.html?ref=${username}`;
    if (document.getElementById('ref-link')) document.getElementById('ref-link').value = fullLink;
    if (document.getElementById('sidebar-ref-link')) document.getElementById('sidebar-ref-link').value = fullLink;
}

function copyRefLink() {
    const refInput = document.getElementById('ref-link');
    refInput.select();
    navigator.clipboard.writeText(refInput.value).then(() => alert("Copied!"));
}

function updateReferralUI() {
    if (!localStorage.getItem('nexmine_ref_earnings')) localStorage.setItem('nexmine_ref_earnings', '150.00');
    const earnings = parseFloat(localStorage.getItem('nexmine_ref_earnings'));
    document.getElementById('ref-earnings').innerText = earnings.toFixed(2);
    document.getElementById('ref-l1').innerText = (earnings * 0.6).toFixed(2) + " NXP";
    document.getElementById('ref-l2').innerText = (earnings * 0.2).toFixed(2) + " NXP";
    document.getElementById('ref-l3').innerText = (earnings * 0.1).toFixed(2) + " NXP";
    document.getElementById('ref-l4').innerText = (earnings * 0.07).toFixed(2) + " NXP";
    document.getElementById('ref-l5').innerText = (earnings * 0.03).toFixed(2) + " NXP";
}

window.addEventListener('load', () => {
    document.getElementById('user-display-name').innerText = localStorage.getItem('nexmine_username');
    document.getElementById('sidebar-username').innerText = localStorage.getItem('nexmine_username');
    document.getElementById('sidebar-email').innerText = localStorage.getItem('nexmine_user_email');
    document.getElementById('sidebar-mobile').innerText = localStorage.getItem('nexmine_mobile');
    document.getElementById('balance').innerText = parseFloat(localStorage.getItem('nexmine_balance')).toFixed(2);
    
    generateReferralLink();
    updateReferralUI();

    const endTime = localStorage.getItem('nexmine_mining_end');
    if (endTime && Date.now() < endTime) startMining();
});
