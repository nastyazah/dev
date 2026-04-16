<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const p = $derived(data.profile);
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Профіль</h1>

    {#if p}
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                    {p.name[0]}
                </div>
                <div>
                    <p class="text-xl font-semibold text-gray-900">{p.name}</p>
                    <p class="text-gray-500">{p.email}</p>
                    <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full mt-1 inline-block">{p.role}</span>
                </div>
            </div>
        </div>

        {#if p.role === 'TEAM' && p.captainOf.length > 0}
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Мої команди</h2>
                {#each p.captainOf as team}
                    <div class="border border-gray-100 rounded-lg p-4 mb-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-medium text-gray-900">{team.name}</p>
                                <p class="text-sm text-gray-500">{team.tournament.title}</p>
                                <p class="text-sm text-gray-500">{team.members.length} учасників</p>
                            </div>
                            <a href="/tournaments/{team.tournament.id}" class="text-blue-600 hover:underline text-sm">
                                Деталі →
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}

        {#if p.role === 'JURY' && p.juryScores.length > 0}
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Оцінені роботи</h2>
                {#each p.juryScores as assignment}
                    <div class="border border-gray-100 rounded-lg p-4 mb-3 flex justify-between items-center">
                        <div>
                            <p class="font-medium text-gray-900">{assignment.submission.team.name}</p>
                        </div>
                        {#if assignment.score}
                            <span class="text-green-600 font-medium">{assignment.score.total.toFixed(1)}</span>
                        {:else}
                            <span class="text-orange-500 text-sm">Не оцінено</span>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    {/if}
</div>