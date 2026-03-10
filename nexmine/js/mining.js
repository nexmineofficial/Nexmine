// NexMine Mining Timer Logic

let miningInterval;
let timeLeft = 24 * 3600; // 24 hours in seconds
const REWARD_RATE_PER_SEC = 1.0 / 3600; // 1.0 NXP per hour

function startMining() {
    console.log("Starting 24h mining session...");
    const btn = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('timer-display');
    const status = document.getElementById('mining-status');

    if (!btn || !timerDisplay || !status) {
        console.error("Mining UI elements not found!");
        return;
    }

    // UI Update
    btn.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    status.innerText = "Active";
    status.classList.remove('text-white/40');
    status.classList.add('text-amber-500');

    // Set 24 hours if not already set (for fresh start)
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
    
    // Simulate referral income for the person who referred this user
    // In a real app, this would happen on the server.
    let refEarnings = parseFloat(localStorage.getItem('nexmine_ref_earnings') || '0');
    // We simulate that this user is a "Level 1" referral for someone else
    // So 10% of their mining goes to their referrer.
    refEarnings += (amount * 0.10); 
    localStorage.setItem('nexmine_ref_earnings', refEarnings.toFixed(8));
    updateReferralUI();

    balanceEl.innerText = currentBalance.toLocaleString(undefined, { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    });
}

// Referral Logic
function generateReferralLink() {
    const username = localStorage.getItem('nexmine_username') || 'user';
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
    const fullLink = `${baseUrl}/signup.html?ref=${username}`;
    
    const refInput = document.getElementById('ref-link');
    const sidebarRefInput = document.getElementById('sidebar-ref-link');
    
    if (refInput) refInput.value = fullLink;
    if (sidebarRefInput) sidebarRefInput.value = fullLink;
}

function copyRefLink() {
    const refInput = document.getElementById('ref-link');
    if (refInput) {
        refInput.select();
        refInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(refInput.value).then(() => {
            const btn = event.target;
            const originalText = btn.innerText;
            btn.innerText = "COPIED!";
            setTimeout(() => btn.innerText = originalText, 2000);
        });
    }
}

function copySidebarRefLink() {
    const refInput = document.getElementById('sidebar-ref-link');
    if (refInput) {
        refInput.select();
        refInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(refInput.value).then(() => {
            const btn = event.target;
            const originalText = btn.innerText;
            btn.innerText = "COPIED!";
            setTimeout(() => btn.innerText = originalText, 2000);
        });
    }
}

// Update Referral Earnings UI
function updateReferralUI() {
    // For demo purposes, if no earnings exist, set a default value
    if (!localStorage.getItem('nexmine_ref_earnings')) {
        localStorage.setItem('nexmine_ref_earnings', '150.00');
    }
    
    // Simulated counts for demo
    if (!localStorage.getItem('nexmine_ref_counts')) {
        localStorage.setItem('nexmine_ref_counts', JSON.stringify({
            l1: 12,
            l2: 45,
            l3: 89,
            l4: 156,
            l5: 342
        }));
    }

    const earnings = parseFloat(localStorage.getItem('nexmine_ref_earnings') || '0.00');
    const refEarningsEl = document.getElementById('ref-earnings');
    if (refEarningsEl) refEarningsEl.innerText = earnings.toFixed(2);

    const counts = JSON.parse(localStorage.getItem('nexmine_ref_counts') || '{}');

    // Level breakdown (Simulated for now)
    const l1 = earnings * 0.6; // 60% from L1
    const l2 = earnings * 0.2; // 20% from L2
    const l3 = earnings * 0.1; // 10% from L3
    const l4 = earnings * 0.07; // 7% from L4
    const l5 = earnings * 0.03; // 3% from L5

    // Update Earnings
    if (document.getElementById('ref-l1')) document.getElementById('ref-l1').innerText = l1.toFixed(2) + " NXP";
    if (document.getElementById('ref-l2')) document.getElementById('ref-l2').innerText = l2.toFixed(2) + " NXP";
    if (document.getElementById('ref-l3')) document.getElementById('ref-l3').innerText = l3.toFixed(2) + " NXP";
    if (document.getElementById('ref-l4')) document.getElementById('ref-l4').innerText = l4.toFixed(2) + " NXP";
    if (document.getElementById('ref-l5')) document.getElementById('ref-l5').innerText = l5.toFixed(2) + " NXP";

    // Update Counts
    if (document.getElementById('ref-l1-count')) document.getElementById('ref-l1-count').innerText = (counts.l1 || 0) + " Users";
    if (document.getElementById('ref-l2-count')) document.getElementById('ref-l2-count').innerText = (counts.l2 || 0) + " Users";
    if (document.getElementById('ref-l3-count')) document.getElementById('ref-l3-count').innerText = (counts.l3 || 0) + " Users";
    if (document.getElementById('ref-l4-count')) document.getElementById('ref-l4-count').innerText = (counts.l4 || 0) + " Users";
    if (document.getElementById('ref-l5-count')) document.getElementById('ref-l5-count').innerText = (counts.l5 || 0) + " Users";
}

// Initialize on Load
window.addEventListener('load', () => {
    const username = localStorage.getItem('nexmine_username');
    const userEmail = localStorage.getItem('nexmine_user_email');
    const mobile = localStorage.getItem('nexmine_mobile');

    // Header & Sidebar
    const displayNameEl = document.getElementById('user-display-name');
    const sidebarUsername = document.getElementById('sidebar-username');
    const sidebarEmail = document.getElementById('sidebar-email');
    const sidebarMobile = document.getElementById('sidebar-mobile');

    if (displayNameEl) displayNameEl.innerText = username || 'User';
    if (sidebarUsername) sidebarUsername.innerText = username || 'User';
    if (sidebarEmail) sidebarEmail.innerText = userEmail || 'No Email';
    if (sidebarMobile) sidebarMobile.innerText = mobile || 'No Mobile';

    // Balance
    const savedBalance = localStorage.getItem('nexmine_balance') || '0.00';
    const balanceEl = document.getElementById('balance');
    if (balanceEl) {
        balanceEl.innerText = parseFloat(savedBalance).toLocaleString(undefined, { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 
        });
    }

    // Referral Link & UI
    generateReferralLink();
    updateReferralUI();

    // Resume Mining
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
