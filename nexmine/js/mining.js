// NexMine Mining & Referral Logic

let miningInterval;
let timeLeft = 24 * 3600; // 24 hours in seconds
const REWARD_RATE_PER_SEC = 1.0 / 3600; // 1.0 NXP per hour

function startMining() {
    console.log("Starting 24h mining session...");
    const btn = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('timer-display');
    const status = document.getElementById('mining-status');

    if (!btn || !timerDisplay || !status) return;

    // UI Update
    btn.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    status.innerText = "Active";
    status.classList.remove('text-white/40');
    status.classList.add('text-amber-500');

    // Set 24 hours if not already set
    if (!localStorage.getItem('nexmine_mining_end')) {
        timeLeft = 24 * 3600;
        const endTime = Date.now() + (timeLeft * 1000);
        localStorage.setItem('nexmine_mining_end', endTime);
    }

    // Interval
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
    
    timeLeft = 24 * 3600;
    localStorage.removeItem('nexmine_mining_end');
}

function updateTimerDisplay() {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    const display = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    const timerEl = document.getElementById('timer-display');
    if (timerEl) timerEl.innerText = display;
}

function addRewardToWallet(amount) {
    const balanceEl = document.getElementById('balance');
    if (!balanceEl) return;

    let currentBalance = parseFloat(localStorage.getItem('nexmine_balance') || '0');
    currentBalance += amount;
    localStorage.setItem('nexmine_balance', currentBalance.toFixed(8));
    
    // Simulate referral income (Levels 1-5)
    const referrer = localStorage.getItem('nexmine_referrer');
    if (referrer) {
        let refEarnings = parseFloat(localStorage.getItem('nexmine_ref_earnings') || '0');
        // Total commission from all levels (10% + 5% + 3% + 2% + 1% = 21%)
        const totalCommission = amount * 0.21;
        refEarnings += totalCommission;
        localStorage.setItem('nexmine_ref_earnings', refEarnings.toFixed(8));
        updateReferralUI();
    }

    balanceEl.innerText = currentBalance.toLocaleString(undefined, { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    });
}

// Referral Logic
function generateReferralLink() {
    const username = localStorage.getItem('nexmine_username') || 'user';
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/dashboard.html')[0];
    const fullLink = `${baseUrl}/signup.html?ref=${username}`;
    
    const refInput = document.getElementById('ref-link');
    const sidebarRefInput = document.getElementById('sidebar-ref-link');
    
    if (refInput) refInput.value = fullLink;
    if (sidebarRefInput) sidebarRefInput.value = fullLink;
}

function copyRefLink(e) {
    const refInput = document.getElementById('ref-link');
    if (refInput) {
        refInput.select();
        navigator.clipboard.writeText(refInput.value).then(() => {
            const btn = e ? e.target : event.target;
            const originalText = btn.innerText;
            btn.innerText = "COPIED!";
            setTimeout(() => btn.innerText = originalText, 2000);
        });
    }
}

function copySidebarRefLink(e) {
    const refInput = document.getElementById('sidebar-ref-link');
    if (refInput) {
        refInput.select();
        navigator.clipboard.writeText(refInput.value).then(() => {
            const btn = e ? e.target : event.target;
            const originalText = btn.innerText;
            btn.innerText = "COPIED!";
            setTimeout(() => btn.innerText = originalText, 2000);
        });
    }
}

function updateReferralUI() {
    if (!localStorage.getItem('nexmine_ref_earnings')) {
        localStorage.setItem('nexmine_ref_earnings', '0.00');
    }
    
    if (!localStorage.getItem('nexmine_ref_counts')) {
        localStorage.setItem('nexmine_ref_counts', JSON.stringify({ l1: 0, l2: 0, l3: 0, l4: 0, l5: 0 }));
    }

    const earnings = parseFloat(localStorage.getItem('nexmine_ref_earnings') || '0.00');
    const refEarningsEl = document.getElementById('ref-earnings');
    if (refEarningsEl) refEarningsEl.innerText = earnings.toFixed(2);

    const counts = JSON.parse(localStorage.getItem('nexmine_ref_counts') || '{}');

    // Level breakdown simulation
    const totalPct = 0.21;
    const l1 = earnings * (0.10 / totalPct);
    const l2 = earnings * (0.05 / totalPct);
    const l3 = earnings * (0.03 / totalPct);
    const l4 = earnings * (0.02 / totalPct);
    const l5 = earnings * (0.01 / totalPct);

    if (document.getElementById('ref-l1')) document.getElementById('ref-l1').innerText = l1.toFixed(2) + " NXP";
    if (document.getElementById('ref-l2')) document.getElementById('ref-l2').innerText = l2.toFixed(2) + " NXP";
    if (document.getElementById('ref-l3')) document.getElementById('ref-l3').innerText = l3.toFixed(2) + " NXP";
    if (document.getElementById('ref-l4')) document.getElementById('ref-l4').innerText = l4.toFixed(2) + " NXP";
    if (document.getElementById('ref-l5')) document.getElementById('ref-l5').innerText = l5.toFixed(2) + " NXP";

    if (document.getElementById('ref-l1-count')) document.getElementById('ref-l1-count').innerText = (counts.l1 || 0) + " Users";
    if (document.getElementById('ref-l2-count')) document.getElementById('ref-l2-count').innerText = (counts.l2 || 0) + " Users";
    if (document.getElementById('ref-l3-count')) document.getElementById('ref-l3-count').innerText = (counts.l3 || 0) + " Users";
    if (document.getElementById('ref-l4-count')) document.getElementById('ref-l4-count').innerText = (counts.l4 || 0) + " Users";
    if (document.getElementById('ref-l5-count')) document.getElementById('ref-l5-count').innerText = (counts.l5 || 0) + " Users";
}

window.addEventListener('load', () => {
    const username = localStorage.getItem('nexmine_username');
    const userEmail = localStorage.getItem('nexmine_user_email');
    const mobile = localStorage.getItem('nexmine_mobile');

    if (document.getElementById('user-display-name')) document.getElementById('user-display-name').innerText = username || 'User';
    if (document.getElementById('sidebar-username')) document.getElementById('sidebar-username').innerText = username || 'User';
    if (document.getElementById('sidebar-email')) document.getElementById('sidebar-email').innerText = userEmail || 'No Email';
    if (document.getElementById('sidebar-mobile')) document.getElementById('sidebar-mobile').innerText = mobile || 'No Mobile';

    const savedBalance = localStorage.getItem('nexmine_balance') || '0.00';
    const balanceEl = document.getElementById('balance');
    if (balanceEl) balanceEl.innerText = parseFloat(savedBalance).toLocaleString(undefined, { minimumFractionDigits: 2 });

    generateReferralLink();
    updateReferralUI();

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
});
