<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const t = $derived(data.tournament);

    const statusLabel: Record<string, string> = {
        DRAFT: 'Чернетка',
        REGISTRATION: 'Реєстрація',
        RUNNING: 'Активний',
        FINISHED: 'Завершено'
    };

    const statusColor: Record<string, string> = {
        DRAFT: 'bg-gray-100 text-gray-600',
        REGISTRATION: 'bg-blue-100 text-blue-700',
        RUNNING: 'bg-green-100 text-green-700',
        FINISHED: 'bg-gray-100 text-gray-600'
    };
</script>
<div class="max-w-5xl mx-auto px-4 py-8">
    <a href="/" class="text-blue-600 hover:underline text-sm mb-6 block">← Всі турніри</a>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
        <div class="flex justify-between items-start mb-4">
            <h1 class="text-3xl font-bold text-gray-900">{t.title}</h1>
            <span class="px-3 py-1 rounded-full text-sm font-medium {statusColor[t.status]}">
				{statusLabel[t.status]}
			</span>
        </div>
        <p class="text-gray-600 mb-6">{t.description}</p>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
                <p class="text-gray-500">Початок реєстрації</p>
                <p class="font-medium">{new Date(t.regStart).toLocaleDateString('uk-UA')}</p>
            </div>
            <div>
                <p class="text-gray-500">Кінець реєстрації</p>
                <p class="font-medium">{new Date(t.regEnd).toLocaleDateString('uk-UA')}</p>
            </div>
            {#if t.maxTeams}
                <div>
                    <p class="text-gray-500">Максимум команд</p>
                    <p class="font-medium">{t.teams.length} / {t.maxTeams}</p>
                </div>
            {/if}
        </div>
    </div>

    {#if t.tasks.length > 0}
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Завдання</h2>
            <div class="space-y-3">
                {#each t.tasks as task}
                    <div class="border border-gray-100 rounded-lg p-4">
                        <div class="flex justify-between items-start">
                            <h3 class="font-medium text-gray-900">{task.title}</h3>
                            <span class="text-xs text-gray-500">
								до {new Date(task.deadline).toLocaleDateString('uk-UA')}
							</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">
            Команди ({t.teams.length})
        </h2>
        {#if t.teams.length === 0}
            <p class="text-gray-500">Команд ще немає</p>
        {:else}
            <div class="divide-y divide-gray-100">
                {#each t.teams as team}
                    <div class="py-3 flex justify-between items-center">
                        <div>
                            <p class="font-medium text-gray-900">{team.name}</p>
                            <p class="text-sm text-gray-500">{team.captain.name} · {team._count.members} учасників</p>
                        </div>
                        {#if team.city}
                            <span class="text-sm text-gray-500">{team.city}</span>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}

        {#if t.status === 'REGISTRATION'}
            <div class="mt-6">

                href="/tournaments/{t.id}/register"
                class="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-block"
                >
                Зареєструвати команду
            </div>
        {/if}
    </div>
</div>