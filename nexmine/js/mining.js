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
    
    const activeReferrals = directReferrals.filter(u => {
        const isSimulatedActive = (u.username.length % 2 === 0); 
        return isSimulatedActive;
    });
    
    return activeReferrals.length;
}

function calculateMiningSpeed() {
    const baseRate = getBaseRewardRate();
    const activeCount = getActiveDirectReferralsCount();
    const boost = activeCount * 0.1; 
    return {
        base: baseRate,
        total: baseRate + boost
    };
}

function startMining() {
    console.log("Attempting to start mining...");
    const btn = document.getElementById('start-mining-btn');
    const timerDisplay = document.getElementById('timer-display');
    const status = document.getElementById('mining-status');
    const speedDisplay = document.getElementById('mining-speed-value');
    const baseSpeedDisplay = document.getElementById('base-speed-value');

    if (!btn || !timerDisplay || !status) {
        console.error("Mining UI elements not found");
        return;
    }

    // UI Update
    btn.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    status.innerText = "Active";
    status.classList.remove('text-white/40');
    status.classList.add('text-amber-500');

    const speeds = calculateMiningSpeed();
    if (speedDisplay) speedDisplay.innerText = speeds.total.toFixed(2);
    if (baseSpeedDisplay) baseSpeedDisplay.innerText = speeds.base.toFixed(2);

    // Set 24 hours if not already set
    if (!localStorage.getItem('nexmine_mining_end')) {
        timeLeft = 24 * 3600;
        const endTime = Date.now() + (timeLeft * 1000);
        localStorage.setItem('nexmine_mining_end', endTime);
        localStorage.setItem('nexmine_last_reward_time', Date.now().toString());
    }

    // Update last active
    updateLastActive();

    // Interval
    if (miningInterval) clearInterval(miningInterval);
    
    console.log("Mining interval started");
    let lastTick = Date.now();
    miningInterval = setInterval(() => {
        try {
            const now = Date.now();
            const endTime = parseInt(localStorage.getItem('nexmine_mining_end') || '0');
            
            if (now >= endTime) {
                console.log("Mining session ended naturally");
                stopMining();
                return;
            }

            const delta = (now - lastTick) / 1000; // seconds elapsed
            lastTick = now;

            timeLeft = Math.floor((endTime - now) / 1000);
            updateTimerDisplay();
            
            const speeds = calculateMiningSpeed();
            const reward = (speeds.total / 3600) * delta;
            
            if (reward > 0) {
                addRewardToWallet(reward);
            }
            
            if (speedDisplay) speedDisplay.innerText = speeds.total.toFixed(2);
            if (baseSpeedDisplay) baseSpeedDisplay.innerText = speeds.base.toFixed(2);
        } catch (e) {
            console.error("Error in mining interval:", e);
        }
    }, 1000);
}

function updateLastActive() {
    const username = localStorage.getItem('nexmine_username');
    const allUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
    const userIndex = allUsers.findIndex(u => u.username === username);
    if (userIndex !== -1) {
        allUsers[userIndex].lastActive = Date.now();
        localStorage.setItem('nexmine_users_list', JSON.stringify(allUsers));
    }
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
    localStorage.removeItem('nexmine_last_reward_time');
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
    try {
        let balance = parseFloat(localStorage.getItem('nexmine_balance') || '0');
        if (isNaN(balance)) balance = 0;
        
        balance += amount;
        localStorage.setItem('nexmine_balance', balance.toFixed(8));
        localStorage.setItem('nexmine_last_reward_time', Date.now().toString());
        
        const balanceEl = document.getElementById('balance');
        if (balanceEl) {
            balanceEl.innerText = balance.toFixed(6);
            balanceEl.style.opacity = "0.9";
            setTimeout(() => { balanceEl.style.opacity = "1"; }, 100);
        }
    } catch (e) {
        console.error("Error adding reward to wallet:", e);
    }
}

function updateReferralEarnings(minedAmount) {
    const referrer = localStorage.getItem('nexmine_referrer');
    if (referrer) {
        let refEarnings = parseFloat(localStorage.getItem('nexmine_ref_earnings') || '0');
        const commission = minedAmount * 0.21; 
        refEarnings += commission;
        localStorage.setItem('nexmine_ref_earnings', refEarnings.toFixed(8));
        updateReferralUI();
    }
}

// Referral Logic
function generateReferralLink() {
    const username = localStorage.getItem('nexmine_username') || 'user';
    const currentUrl = window.location.href;
    
    let baseUrl = currentUrl.split('/dashboard.html')[0];
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
    
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
            const btn = e ? (e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button')) : (event ? event.target : null);
            if (btn) {
                const originalText = btn.innerText;
                btn.innerText = "COPIED!";
                setTimeout(() => btn.innerText = originalText, 2000);
            }
        });
    }
}

function copySidebarRefLink(e) {
    const refInput = document.getElementById('sidebar-ref-link');
    if (refInput) {
        refInput.select();
        navigator.clipboard.writeText(refInput.value).then(() => {
            const btn = e ? (e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button')) : (event ? event.target : null);
            if (btn) {
                const originalText = btn.innerText;
                btn.innerText = "COPIED!";
                setTimeout(() => btn.innerText = originalText, 2000);
            }
        });
    }
}

function getReferralLevels() {
    const username = localStorage.getItem('nexmine_username');
    const allUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
    
    const levels = { l1: [], l2: [], l3: [], l4: [], l5: [] };

    levels.l1 = allUsers.filter(u => u.referrer === username);
    levels.l1.forEach(u1 => {
        const l2Users = allUsers.filter(u => u.referrer === u1.username);
        levels.l2.push(...l2Users);
    });
    levels.l2.forEach(u2 => {
        const l3Users = allUsers.filter(u => u.referrer === u2.username);
        levels.l3.push(...l3Users);
    });
    levels.l3.forEach(u3 => {
        const l4Users = allUsers.filter(u => u.referrer === u3.username);
        levels.l4.push(...l4Users);
    });
    levels.l4.forEach(u4 => {
        const l5Users = allUsers.filter(u => u.referrer === u4.username);
        levels.l5.push(...l5Users);
    });

    return levels;
}

function updateReferralUI() {
    const earnings = parseFloat(localStorage.getItem('nexmine_ref_earnings') || '0.00');
    const levelsData = getReferralLevels();
    
    const signupBonuses = {
        l1: levelsData.l1.length * 100,
        l2: levelsData.l2.length * 50,
        l3: levelsData.l3.length * 30,
        l4: levelsData.l4.length * 20,
        l5: levelsData.l5.length * 10
    };

    const totalSignupBonus = signupBonuses.l1 + signupBonuses.l2 + signupBonuses.l3 + signupBonuses.l4 + signupBonuses.l5;
    const totalEarnings = earnings + totalSignupBonus;

    const refEarningsEl = document.getElementById('ref-earnings');
    if (refEarningsEl) refEarningsEl.innerText = totalEarnings.toFixed(2);

    const totalPct = 0.21;
    const l1_mining = earnings * (0.10 / totalPct);
    const l2_mining = earnings * (0.05 / totalPct);
    const l3_mining = earnings * (0.03 / totalPct);
    const l4_mining = earnings * (0.02 / totalPct);
    const l5_mining = earnings * (0.01 / totalPct);

    const levels = [
        { id: 'ref-l1', val: l1_mining + signupBonuses.l1, countId: 'ref-l1-count', count: levelsData.l1.length },
        { id: 'ref-l2', val: l2_mining + signupBonuses.l2, countId: 'ref-l2-count', count: levelsData.l2.length },
        { id: 'ref-l3', val: l3_mining + signupBonuses.l3, countId: 'ref-l3-count', count: levelsData.l3.length },
        { id: 'ref-l4', val: l4_mining + signupBonuses.l4, countId: 'ref-l4-count', count: levelsData.l4.length },
        { id: 'ref-l5', val: l5_mining + signupBonuses.l5, countId: 'ref-l5-count', count: levelsData.l5.length }
    ];

    levels.forEach(lvl => {
        const el = document.getElementById(lvl.id);
        const countEl = document.getElementById(lvl.countId);
        if (el) el.innerText = lvl.val.toFixed(2) + " NXP";
        if (countEl) countEl.innerText = (lvl.count || 0) + " Users";
    });
}

window.addEventListener('load', () => {
    console.log("Dashboard loaded, initializing...");
    
    let username = localStorage.getItem('nexmine_username');
    let userEmail = localStorage.getItem('nexmine_user_email');
    let mobile = localStorage.getItem('nexmine_mobile');

    if (!username || !mobile) {
        const allUsers = JSON.parse(localStorage.getItem('nexmine_users_list') || '[]');
        const user = allUsers.find(u => u.email === userEmail);
        if (user) {
            if (!username) {
                username = user.username;
                localStorage.setItem('nexmine_username', username);
            }
            if (!mobile || mobile === 'Not Set') {
                mobile = user.mobile;
                localStorage.setItem('nexmine_mobile', mobile);
            }
        }
    }

    if (document.getElementById('user-display-name')) document.getElementById('user-display-name').innerText = username || 'User';
    if (document.getElementById('sidebar-username')) document.getElementById('sidebar-username').innerText = username || 'User';
    if (document.getElementById('sidebar-email')) document.getElementById('sidebar-email').innerText = userEmail || 'No Email';
    if (document.getElementById('sidebar-mobile')) document.getElementById('sidebar-mobile').innerText = mobile || 'Not Set';

    const savedBalance = localStorage.getItem('nexmine_balance') || '0.00';
    const balanceEl = document.getElementById('balance');
    if (balanceEl) balanceEl.innerText = parseFloat(savedBalance).toFixed(6);

    const speeds = calculateMiningSpeed();
    if (document.getElementById('base-speed-value')) document.getElementById('base-speed-value').innerText = speeds.base.toFixed(2);
    if (document.getElementById('mining-speed-value')) document.getElementById('mining-speed-value').innerText = speeds.total.toFixed(2);

    generateReferralLink();
    updateReferralUI();

    const endTime = localStorage.getItem('nexmine_mining_end');
    if (endTime && Date.now() < parseInt(endTime)) {
        const lastRewardTime = parseInt(localStorage.getItem('nexmine_last_reward_time') || Date.now().toString());
        const now = Date.now();
        if (now > lastRewardTime) {
            const speeds = calculateMiningSpeed();
            const elapsedSec = (now - lastRewardTime) / 1000;
            const offlineReward = (speeds.total / 3600) * elapsedSec;
            addRewardToWallet(offlineReward);
        }
        startMining();
    } else if (endTime && Date.now() >= parseInt(endTime)) {
        stopMining();
    }

    window.addEventListener('storage', (e) => {
        if (e.key === 'nexmine_balance') {
            const balanceEl = document.getElementById('balance');
            if (balanceEl) balanceEl.innerText = parseFloat(e.newValue || '0').toFixed(6);
        }
    });
});
