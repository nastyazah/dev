<!-- src/routes/+page.svelte -->
<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';

    // ── Carousel ──────────────────────────────────────────────
    let currentSlide = $state(0);

    const announcements = [
        {
            badge: 'CODE4FUTURE',
            title: 'Командний турнір з програмування',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80'
        },
        {
            badge: 'CODE4FUTURE',
            title: 'Реєстрація команд відкрита до 30 квітня',
            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80'
        },
        {
            badge: 'CODE4FUTURE',
            title: 'Підсумки попереднього сезону',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80'
        },
        {
            badge: 'CODE4FUTURE',
            title: 'Нові критерії оцінювання 2026',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80'
        },
        {
            badge: 'CODE4FUTURE',
            title: 'Склад журі оголошено',
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80'
        }
    ];

    function nextSlide() { currentSlide = (currentSlide + 1) % announcements.length; }

    // ── Courses ───────────────────────────────────────────────
    const courses = [
        {
            id: 1,
            title: 'Python для початківців',
            badge: 'Безкоштовно',
            image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&q=80'
        },
        {
            id: 2,
            title: 'Web-розробка з нуля',
            badge: 'Безкоштовно',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=80'
        },
        {
            id: 3,
            title: 'Основи алгоритмів',
            badge: 'Безкоштовно',
            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=700&q=80'
        }
    ];
</script>

<svelte:head>
    <title>LvlUp — SFL Tournament 2026</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<div class="bg-[#1D1D26] min-h-screen" style="font-family: 'Manrope', sans-serif;">

    <Header />

    <!-- ══════════════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════════════ -->
    <section
            class="relative overflow-hidden py-14 md:py-20"
            style="background: linear-gradient(160deg, #1D1D26 0%, #18153A 50%, #1D1D26 100%);"
    >
        <!-- Subtle glow -->
        <div
                class="absolute inset-0 pointer-events-none"
                style="background: radial-gradient(ellipse 55% 45% at 50% 35%, rgba(62,131,255,0.09) 0%, transparent 70%);"
        ></div>

        <div class="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20
                    grid grid-cols-1 lg:grid-cols-[1fr_300px_1fr] gap-10 lg:gap-8 items-center">

            <!-- LEFT: headline + buttons -->
            <div class="flex flex-col gap-5 order-2 lg:order-1">
                <h1 class="text-[36px] md:text-[48px] xl:text-[52px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
                    Empower Child with<br>Future-Ready Tech Skills
                </h1>
                <p class="text-[15px] font-light leading-[1.75] text-white/60 max-w-[360px]">
                    Join us in creating tech leaders of tomorrow while supporting underprivileged children globally.
                </p>
                <div class="flex items-center gap-4 mt-2 flex-wrap">
                    <a
                            href="/about"
                            class="inline-flex items-center justify-center h-[52px] px-7 rounded-[15px]
                               text-[15px] font-semibold text-white
                               border border-white/30 hover:border-white/60 hover:bg-white/5
                               transition-all duration-150"
                    >
                        Детальніше
                    </a>
                    <a
                            href="/auth/register"
                            class="inline-flex items-center justify-center h-[52px] px-7 rounded-[15px]
                               text-[15px] font-semibold text-white
                               bg-[#3E83FF] hover:bg-[#2563CC]
                               transition-colors duration-150"
                    >
                        Зареєструватись
                    </a>
                </div>
            </div>

            <!-- CENTER: circle photo -->
            <div class="flex items-center justify-center order-1 lg:order-2">
                <div class="relative">
                    <!-- Glow ring -->
                    <div
                            class="absolute rounded-full pointer-events-none"
                            style="inset: -16px; background: radial-gradient(circle, rgba(62,131,255,0.18) 0%, transparent 68%);"
                    ></div>
                    <div class="w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden
                                border-2 border-[#3E83FF]/30 relative z-10">
                        <!--
                            Замінити на власне фото:
                            <img src="/images/hero/child-tablet.jpg" alt="Дитина вивчає технології" class="w-full h-full object-cover" />
                        -->
                        <img
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=560&q=80"
                                alt="Дитина вивчає технології"
                                class="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <!-- RIGHT: feature cards -->
            <div class="flex flex-col gap-5 order-3">
                <h2 class="text-[20px] md:text-[22px] font-bold leading-snug text-white">
                    Стань частиною спільноти майбутніх<br>
                    <span class="text-[#40C8FF]">tech-лідерів</span>
                </h2>

                <!-- Feature card 1: Команда -->
                <div class="flex items-start gap-4 p-4 rounded-2xl bg-[#1B1156]/40 border border-[#3E83FF]/15 hover:border-[#3E83FF]/30 transition-colors">
                    <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-[#3E83FF]/12 border border-[#3E83FF]/20">
                        <!-- Icon: people/team -->
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="7.5" cy="6" r="2.5" stroke="#3E83FF" stroke-width="1.6"/>
                            <path d="M2 16.5c0-2.761 2.462-5 5.5-5s5.5 2.239 5.5 5" stroke="#3E83FF" stroke-width="1.6" stroke-linecap="round"/>
                            <circle cx="14.5" cy="7" r="2" stroke="#3E83FF" stroke-width="1.5"/>
                            <path d="M18 16.5c0-2.209-1.567-4-3.5-4" stroke="#3E83FF" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-[14px] font-bold text-white leading-tight">Команда до 5 учасників</p>
                        <p class="text-[13px] font-light text-white/50 mt-1 leading-snug">Створюй команду або приєднуйся до існуючої</p>
                    </div>
                </div>

                <!-- Feature card 2: Завдання -->
                <div class="flex items-start gap-4 p-4 rounded-2xl bg-[#1B1156]/40 border border-[#3E83FF]/15 hover:border-[#3E83FF]/30 transition-colors">
                    <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-[#3E83FF]/12 border border-[#3E83FF]/20">
                        <!-- Icon: document/task -->
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x="4" y="2.5" width="12" height="15" rx="2" stroke="#3E83FF" stroke-width="1.6"/>
                            <path d="M7 7h6M7 10.5h6M7 14h4" stroke="#3E83FF" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-[14px] font-bold text-white leading-tight">Реальні завдання</p>
                        <p class="text-[13px] font-light text-white/50 mt-1 leading-snug">Backend, frontend, база даних — повний стек</p>
                    </div>
                </div>

                <!-- Feature card 3: Журі -->
                <div class="flex items-start gap-4 p-4 rounded-2xl bg-[#1B1156]/40 border border-[#3E83FF]/15 hover:border-[#3E83FF]/30 transition-colors">
                    <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-[#3E83FF]/12 border border-[#3E83FF]/20">
                        <!-- Icon: star/jury -->
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2.5l2 5.5h5.5l-4.5 3.5 1.5 5.5L10 14l-4.5 3 1.5-5.5L2.5 8h5.5z" stroke="#3E83FF" stroke-width="1.5" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-[14px] font-bold text-white leading-tight">Оцінювання журі</p>
                        <p class="text-[13px] font-light text-white/50 mt-1 leading-snug">Прозора система балів по категоріях</p>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         ВАЖЛИВІ ОГОЛОШЕННЯ
    ══════════════════════════════════════════════════════════ -->
    <section class="py-10 md:py-14">
        <div class="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">

            <h2 class="text-[22px] font-bold text-white mb-6">Важливі оголошення</h2>

            <!-- Carousel container -->
            <div class="relative rounded-2xl overflow-hidden" style="min-height: 220px;">

                <!-- Photo left -->
                <div class="absolute inset-y-0 left-0 w-[40%] md:w-[35%]">
                    <img
                            src={announcements[currentSlide].image}
                            alt={announcements[currentSlide].title}
                            class="w-full h-full object-cover transition-opacity duration-300"
                    />
                    <!-- Gradient overlay merging into right side -->
                    <div
                            class="absolute inset-0"
                            style="background: linear-gradient(to right, transparent 40%, #1B2060 100%);"
                    ></div>
                </div>

                <!-- Content right (blue gradient bg) -->
                <div
                        class="relative flex flex-col justify-center px-8 md:px-14 py-10 ml-[30%] md:ml-[25%]"
                        style="background: linear-gradient(135deg, #1B2060 0%, #16194e 100%); min-height: 220px;"
                >
                    <span class="text-[11px] font-bold tracking-[0.12em] uppercase text-white/50 mb-3">
                        {announcements[currentSlide].badge}
                    </span>
                    <h3 class="text-[22px] md:text-[28px] font-extrabold text-white leading-[1.25] max-w-[500px] pr-14">
                        {announcements[currentSlide].title}
                    </h3>
                </div>

                <!-- Arrow button -->
                <button
                        onclick={nextSlide}
                        class="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                           bg-white/12 border border-white/20 flex items-center justify-center
                           hover:bg-white/22 transition-colors z-10"
                        aria-label="Наступне"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3.5l4.5 4.5L6 12.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>

            <!-- Dots -->
            <div class="flex items-center justify-center gap-2 mt-4">
                {#each announcements as _, i}
                    <button
                            onclick={() => (currentSlide = i)}
                            class="rounded-full transition-all duration-200
                               {i === currentSlide
                                   ? 'w-[22px] h-[8px] bg-[#3E83FF]'
                                   : 'w-2 h-2 bg-white/25 hover:bg-white/45'}"
                            aria-label="Слайд {i + 1}"
                    ></button>
                {/each}
            </div>
        </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         ПОПУЛЯРНІ КУРСИ
    ══════════════════════════════════════════════════════════ -->
    <section class="pb-12 md:pb-16">
        <div class="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">

            <h2 class="text-[22px] font-bold text-white mb-6">Популярні курси</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {#each courses as course}
                    <a
                            href="/courses/{course.id}"
                            class="group flex flex-col rounded-2xl overflow-hidden bg-[#191921]
                               border border-white/6 hover:border-[#3E83FF]/30
                               transition-all duration-200 hover:-translate-y-1"
                    >
                        <!-- Thumbnail — aspect ratio 335:250 approx from design -->
                        <div class="overflow-hidden" style="aspect-ratio: 335/250;">
                            <!--
                                Замінити на власне фото:
                                <img src="/images/courses/{course.id}.jpg" alt="{course.title}" ... />
                            -->
                            <img
                                    src={course.image}
                                    alt={course.title}
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <!-- Info -->
                        <div class="p-4 flex flex-col gap-2">
                            <p class="text-[14px] font-semibold text-white leading-snug">{course.title}</p>
                            <span class="inline-block text-[11px] font-bold text-[#3E83FF] bg-[#3E83FF]/10 px-3 py-1 rounded-full w-fit">
                                {course.badge}
                            </span>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         CTA — Реєструйся та інвестуй у майбутнє
    ══════════════════════════════════════════════════════════ -->
    <section class="pb-14 md:pb-20">
        <div class="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
            <div
                    class="relative overflow-hidden rounded-2xl
                       flex flex-col md:flex-row items-start md:items-center
                       justify-between gap-8 px-8 md:px-14 py-12"
                    style="background: linear-gradient(135deg, #1B2060 0%, #16194e 60%, #101030 100%);"
            >
                <!-- Decorative glow circles -->
                <div
                        class="absolute rounded-full pointer-events-none"
                        style="width:350px; height:350px; right:-60px; top:-100px;
                           background: radial-gradient(circle, rgba(62,131,255,0.18) 0%, transparent 65%);"
                ></div>
                <div
                        class="absolute rounded-full pointer-events-none"
                        style="width:220px; height:220px; right:140px; bottom:-70px;
                           background: radial-gradient(circle, rgba(64,200,255,0.10) 0%, transparent 65%);"
                ></div>

                <h2 class="relative z-10 text-[28px] md:text-[34px] font-extrabold text-white leading-[1.2] max-w-[520px]">
                    Реєструйся та інвестуй у майбутнє разом з нами
                </h2>

                <div class="relative z-10 flex-shrink-0">
                    <a
                            href="/auth/register"
                            class="inline-flex items-center justify-center h-[56px] px-9 rounded-[15px]
                               text-[16px] font-semibold text-white
                               bg-[#3E83FF] hover:bg-[#2563CC]
                               transition-colors duration-150"
                    >
                        Зареєструватись
                    </a>
                </div>
            </div>
        </div>
    </section>

    <Footer />

</div>