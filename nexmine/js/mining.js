<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tasks | NexMine</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white font-sans min-h-screen flex flex-col">
    <header class="p-6 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div class="flex items-center gap-2">
            <a href="dashboard.html" class="flex items-center gap-2">
                <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span class="font-black tracking-tighter text-xl bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">Tasks</span>
            </a>
        </div>
        <div id="user-display-name" class="text-xs text-white/70 font-black">Loading...</div>
    </header>

    <main class="flex-1 p-6 max-w-lg mx-auto w-full space-y-8 pb-24">
        <!-- Social Tasks -->
        <div class="space-y-4">
            <div class="flex justify-between items-center px-2">
                <h3 class="text-xs font-black uppercase tracking-widest text-white/40">Social Tasks</h3>
                <span class="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">One-Time</span>
            </div>
            <div class="space-y-3">
                <!-- Telegram -->
                <div class="group bg-zinc-900/50 hover:bg-zinc-900 p-4 rounded-2xl border border-white/5 flex justify-between items-center transition-all cursor-pointer">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.36-.48.99-.74 3.89-1.69 6.48-2.8 7.78-3.33 3.69-1.5 4.46-1.76 4.96-1.77.11 0 .36.03.52.16.13.11.17.25.19.35.02.1.03.23.01.35z"/></svg>
                        </div>
                        <div><span class="block text-sm font-black">Join Telegram</span></div>
                    </div>
                    <div class="text-right"><span class="block text-amber-500 font-black text-sm">+50.00</span></div>
                </div>
                <!-- Instagram -->
                <div class="group bg-zinc-900/50 hover:bg-zinc-900 p-4 rounded-2xl border border-white/5 flex justify-between items-center transition-all cursor-pointer">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </div>
                        <div><span class="block text-sm font-black">Follow Instagram</span></div>
                    </div>
                    <div class="text-right"><span class="block text-amber-500 font-black text-sm">+50.00</span></div>
                </div>
                <!-- YouTube -->
                <div class="group bg-zinc-900/50 hover:bg-zinc-900 p-4 rounded-2xl border border-white/5 flex justify-between items-center transition-all cursor-pointer">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg class="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg>
                        </div>
                        <div><span class="block text-sm font-black">Subscribe YouTube</span></div>
                    </div>
                    <div class="text-right"><span class="block text-amber-500 font-black text-sm">+50.00</span></div>
                </div>
            </div>
        </div>

        <!-- Daily Tasks -->
        <div class="space-y-4">
            <div class="flex justify-between items-center px-2">
                <h3 class="text-xs font-black uppercase tracking-widest text-white/40">Daily Tasks</h3>
                <span class="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">Daily</span>
            </div>
            <div class="bg-zinc-900/30 p-8 rounded-3xl border border-dashed border-white/10 text-center">
                <p class="text-sm text-white/30 font-bold">New daily tasks will appear here soon!</p>
            </div>
        </div>
    </main>

    <script>
        window.addEventListener('load', () => {
            const username = localStorage.getItem('nexmine_username');
            const displayNameEl = document.getElementById('user-display-name');
            if (displayNameEl) displayNameEl.innerText = username || 'User';
        });
    </script>
</body>
</html>
