<script lang="ts">
    let { data } = $props();
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Адмін панель</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p class="text-sm text-gray-500">Всього турнірів</p>
            <p class="text-3xl font-bold text-blue-600">{data.tournaments.length}</p>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">Турніри</h2>
            <a href="/admin/tournaments/new" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                + Новий турнір
            </a>
        </div>
        <div class="divide-y divide-gray-200">
            {#each data.tournaments as tournament}
                <div class="p-6 flex justify-between items-center">
                    <div>
                        <p class="font-medium text-gray-900">{tournament.title}</p>
                        <p class="text-sm text-gray-500">{tournament.status}</p>
                    </div>
                    <a href="/admin/tournaments/{tournament.id}" class="text-blue-600 hover:underline text-sm">
                        Деталі →
                    </a>
                </div>
            {/each}
        </div>
    </div>
</div>