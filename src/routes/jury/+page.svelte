<!-- src/routes/jury/+page.svelte -->
<script lang="ts">
    let { data } = $props();

    const pending = $derived(data.assignments.filter((a) => !a.score));
    const done = $derived(data.assignments.filter((a) => a.score));
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Панель журі</h1>

    <div class="grid grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p class="text-sm text-gray-500">Очікують оцінки</p>
            <p class="text-3xl font-bold text-orange-500">{pending.length}</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p class="text-sm text-gray-500">Оцінено</p>
            <p class="text-3xl font-bold text-green-600">{done.length}</p>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Мої роботи</h2>
        </div>
        <div class="divide-y divide-gray-200">
            {#each data.assignments as assignment}
                <div class="p-6 flex justify-between items-center">
                    <div>
                        <p class="font-medium text-gray-900">{assignment.submission.team.name}</p>
                        <p class="text-sm text-gray-500">{assignment.submission.task.title}</p>
                    </div>
                    <div class="flex items-center gap-4">
                        {#if assignment.score}
                            <span class="text-green-600 font-medium">{assignment.score.total.toFixed(1)}</span>
                        {:else}
                            <span class="text-orange-500 text-sm">Не оцінено</span>
                        {/if}
                        <a href="/jury/score/{assignment.id}" class="text-blue-600 hover:underline text-sm">
                            {assignment.score ? 'Переглянути' : 'Оцінити'} →
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>