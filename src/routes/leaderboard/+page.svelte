<!-- src/routes/leaderboard/+page.svelte -->
<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Таблиця лідерів</h1>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
            <select
                    onchange={(e) => window.location.href = `/leaderboard?tournamentId=${e.currentTarget.value}`}
                    class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {#each data.tournaments as tournament}
                    <option value={tournament.id} selected={tournament.id === data.tournamentId}>
                        {tournament.title}
                    </option>
                {/each}
            </select>
        </div>

        <div class="divide-y divide-gray-200">
            {#each data.leaderboard as team, i}
                <div class="p-6 flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
						{i === 0 ? 'bg-yellow-100 text-yellow-700' :
						 i === 1 ? 'bg-gray-100 text-gray-700' :
						 i === 2 ? 'bg-orange-100 text-orange-700' :
						 'bg-blue-50 text-blue-600'}">
                        {i + 1}
                    </div>
                    <div class="flex-1">
                        <p class="font-semibold text-gray-900">{team.teamName}</p>
                        <p class="text-sm text-gray-500">{team.scoresCount} оцінок</p>
                    </div>
                    <div class="text-right">
                        <p class="text-2xl font-bold text-blue-600">{team.average.toFixed(1)}</p>
                    </div>
                </div>
            {:else}
                <div class="p-12 text-center text-gray-500">
                    Оцінок ще немає
                </div>
            {/each}
        </div>
    </div>
</div>