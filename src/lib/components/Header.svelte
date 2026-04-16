<!-- src/lib/components/Header.svelte -->
<script lang="ts">
    import { page } from '$app/stores';

    let mobileOpen = $state(false);

    const navLinks = [
        { label: 'Курси',      href: '/courses' },
        { label: 'Календар',   href: '/calendar' },
        { label: 'Команда',    href: '/teams' },
        { label: 'Рейтинг',    href: '/leaderboard' },
        { label: 'Інформація', href: '/about' }
    ];

    function isActive(href: string) {
        return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
    }
</script>

<header class="sticky top-0 z-50 bg-[#1D1D26]/96 backdrop-blur-sm border-b border-white/5">
    <div class="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 flex items-center h-[72px] gap-8">

        <!-- Logo -->
        <a href="/" class="flex-shrink-0" aria-label="LvlUp — Головна">
            <!-- Замінити на: <img src="/images/logo.svg" alt="LvlUp" class="h-11 w-auto" /> -->
            <svg width="88" height="44" viewBox="0 0 88 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="18" font-family="Manrope,sans-serif" font-size="13" font-weight="600" fill="#3E83FF">Lvl</text>
                <text x="0" y="40" font-family="Manrope,sans-serif" font-size="28" font-weight="800" fill="#3E83FF">Up</text>
                <path d="M46 8 L60 20 L46 32" stroke="#3E83FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1 flex-1">
            {#each navLinks as link}
                <a
                        href={link.href}
                        class="text-[15px] font-medium px-4 py-[7px] rounded-full border transition-colors duration-150
                           {isActive(link.href)
                               ? 'text-white border-white/40'
                               : 'text-white/70 border-transparent hover:text-white'}"
                >
                    {link.label}
                </a>
            {/each}
        </nav>

        <!-- Desktop: search + login -->
        <div class="hidden md:flex items-center gap-5 ml-auto">
            <button class="w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-colors" aria-label="Пошук">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M12 12l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </button>
            <a href="/auth/login" class="flex items-center gap-2 text-[14px] font-medium text-white/65 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="5.5" r="3" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M2.5 15.5c0-3.038 2.91-5.5 6.5-5.5s6.5 2.462 6.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                Log in / Sign in
            </a>
        </div>

        <!-- Mobile: burger -->
        <button
                class="md:hidden ml-auto flex items-center justify-center w-10 h-10 text-white"
                onclick={() => (mobileOpen = !mobileOpen)}
                aria-label="Меню"
                aria-expanded={mobileOpen}
        >
            {#if mobileOpen}
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M5 5l12 12M5 17L17 5" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            {:else}
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M3 6h16M3 11h16M3 16h16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            {/if}
        </button>
    </div>

    <!-- Mobile dropdown -->
    {#if mobileOpen}
        <nav class="md:hidden bg-[#191921] border-t border-white/5 px-5 pt-2 pb-5 flex flex-col gap-1">
            {#each navLinks as link}
                <a
                        href={link.href}
                        onclick={() => (mobileOpen = false)}
                        class="px-4 py-3 rounded-xl text-[15px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                    {link.label}
                </a>
            {/each}
            <div class="mt-3 flex flex-col gap-2 border-t border-white/8 pt-3">
                <a href="/auth/login" onclick={() => (mobileOpen = false)}
                   class="px-4 py-3 rounded-[15px] text-[15px] font-semibold text-center border border-white/25 text-white/70 hover:text-white transition-colors">
                    Увійти
                </a>
                <a href="/auth/register" onclick={() => (mobileOpen = false)}
                   class="px-4 py-3 rounded-[15px] text-[15px] font-semibold text-center bg-[#3E83FF] text-white hover:opacity-90 transition-opacity">
                    Зареєструватись
                </a>
            </div>
        </nav>
    {/if}
</header>