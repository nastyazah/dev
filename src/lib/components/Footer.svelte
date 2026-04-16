<!-- src/lib/components/Footer.svelte -->
<footer>
    <!-- Main footer columns -->
    <div class="bg-[#111116] border-t border-white/5">
        <div class="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-12
                    grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_160px] gap-10">

            <!-- ГОЛОВНЕ -->
            <div>
                <p class="text-[11px] font-extrabold tracking-[0.1em] uppercase text-white/40 mb-5">ГОЛОВНЕ</p>
                <ul class="flex flex-col gap-[10px]">
                    <li><a href="/about"       class="text-[13px] text-white/55 hover:text-white transition-colors">Про нас</a></li>
                    <li><a href="/events"      class="text-[13px] text-white/55 hover:text-white transition-colors">Всі події</a></li>
                    <li><a href="/courses"     class="text-[13px] text-white/55 hover:text-white transition-colors">Всі курси</a></li>
                    <li><a href="/news"        class="text-[13px] text-white/55 hover:text-white transition-colors">Новини</a></li>
                    <li><a href="/ambassadors" class="text-[13px] text-white/55 hover:text-white transition-colors">Амбасадори</a></li>
                </ul>
            </div>

            <!-- ТУРНІРИ -->
            <div>
                <p class="text-[11px] font-extrabold tracking-[0.1em] uppercase text-white/40 mb-5">ТУРНІРИ</p>
                <ul class="flex flex-col gap-[10px]">
                    <li><a href="/tournaments"             class="text-[13px] text-white/55 hover:text-white transition-colors">Цьогорічні турніри</a></li>
                    <li><a href="/tournaments/reports"     class="text-[13px] text-white/55 hover:text-white transition-colors">Звіти по турнірам</a></li>
                    <li><a href="/tournaments/jury"        class="text-[13px] text-white/55 hover:text-white transition-colors">Журі</a></li>
                    <li><a href="/tournaments/programming" class="text-[13px] text-white/55 hover:text-white transition-colors">Турнір з програмування</a></li>
                </ul>
            </div>

            <!-- СПОСОБИ ЗВ'ЯЗКУ -->
            <div>
                <p class="text-[11px] font-extrabold tracking-[0.1em] uppercase text-white/40 mb-5">СПОСОБИ ЗВ'ЯЗКУ</p>
                <ul class="flex flex-col gap-[10px]">
                    <li><a href="mailto:levelUp@gmail.com"            class="text-[13px] text-white/55 hover:text-white transition-colors">levelUp@gmail.com</a></li>
                    <li><a href="mailto:levelUptournaments@gmail.com" class="text-[13px] text-white/55 hover:text-white transition-colors">levelUptournaments@gmail.com</a></li>
                </ul>
            </div>

            <!-- Logo -->
            <div class="col-span-2 md:col-span-1 flex items-start justify-end">
                <a href="/" aria-label="LvlUp — Головна">
                    <!-- Замінити на: <img src="/images/logo.svg" alt="LvlUp" class="h-[80px] w-auto" /> -->
                    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="28" font-family="Manrope,sans-serif" font-size="16" font-weight="600" fill="#3E83FF">Lvl</text>
                        <text x="0" y="72" font-family="Manrope,sans-serif" font-size="48" font-weight="800" fill="#3E83FF">Up</text>
                        <path d="M68 16 L88 32 L68 48" stroke="#3E83FF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>

    <!-- Bottom legal bar -->
    <div class="bg-[#0D0D12] border-t border-white/5">
        <div class="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-[18px]
                    flex flex-wrap items-center justify-center gap-3">
            <a href="/privacy" class="text-[12px] text-white/35 hover:text-white/60 transition-colors">Політика конфіденційності</a>
            <span class="text-white/20 text-[12px]">|</span>
            <a href="/terms"   class="text-[12px] text-white/35 hover:text-white/60 transition-colors">Умови співпраці</a>
            <span class="text-white/20 text-[12px]">|</span>
            <span class="text-[12px] text-white/25">© 2026</span>
        </div>
    </div>
</footer>