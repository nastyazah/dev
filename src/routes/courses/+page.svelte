<script lang="ts">
    // Тут буде завантаження даних (список курсів) з твого сервера
    let courses = [
        {
            id: '1',
            title: 'Основи UI/UX дизайну',
            category: 'DESIGN',
            xp: 200,
            hasFigma: true,
            status: 'available'
        },
        {
            id: '2',
            title: 'SvelteKit для профі',
            category: 'DEVELOPMENT',
            xp: 350,
            hasCode: true,
            status: 'locked'
        }
    ];


</script>

<div class="max-w-6xl mx-auto px-4 py-10">
    <header class="mb-10">
        <h1 class="text-4xl font-black text-gray-900 mb-2 italic">LvlUp Academy</h1>
        <p class="text-gray-500 text-lg">Проходь навчання, здавай тести та заробляй XP для своєї команди.</p>
    </header>

    <div class="flex gap-4 mb-8">
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">Всі курси</button>
        <button class="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">Розробка</button>
        <button class="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">Дизайн</button>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each courses as course}
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <span class="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded uppercase tracking-wider">
                        {course.category}
                    </span>
                    <span class="text-sm font-bold text-orange-600">+{course.xp} XP</span>
                </div>

                <h3 class="text-xl font-bold text-gray-900 mb-4">{course.title}</h3>

                <div class="flex gap-2 mb-6">
                    {#if course.hasFigma}
                        <span class="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold">FIGMA</span>
                    {/if}
                    {#if course.hasCode}
                        <span class="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">CODE</span>
                    {/if}
                </div>

                <button class="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors">
                    {course.status === 'locked' ? 'Заблоковано 🔒' : 'Почати навчання'}
                </button>
            </div>
        {/each}
    </div>
</div>