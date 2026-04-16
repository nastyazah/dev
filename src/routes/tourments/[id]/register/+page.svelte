<!-- src/routes/tournaments/[id]/register/+page.svelte -->
<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';

    let { data }: { data: PageData } = $props();

    let teamName = $state('');
    let city = $state('');
    let contact = $state('');
    let members = $state([
        { name: '', email: '' },
        { name: '', email: '' }
    ]);
    let loading = $state(false);
    let errorMsg = $state('');

    function addMember() {
        if (members.length < 10) {
            members = [...members, { name: '', email: '' }];
        }
    }

    function removeMember(i: number) {
        if (members.length > 2) {
            members = members.filter((_, idx) => idx !== i);
        }
    }

    async function handleSubmit() {
        loading = true;
        errorMsg = '';

        const res = await fetch('/api/teams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: teamName,
                city,
                contact,
                tournamentId: data.tournament.id,
                members
            })
        });

        if (res.ok) {
            await goto(`/tournaments/${data.tournament.id}`);
        } else {
            const body = await res.json();
            errorMsg = body.error ?? 'Помилка реєстрації';
        }

        loading = false;
    }
</script>

<div class="max-w-2xl mx-auto px-4 py-8">
    <a href="/tournaments/{data.tournament.id}" class="text-blue-600 hover:underline text-sm mb-6 block">← Назад</a>

    <h1 class="text-2xl font-bold text-gray-900 mb-2">Реєстрація команди</h1>
    <p class="text-gray-500 mb-6">{data.tournament.title}</p>

    {#if errorMsg}
        <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700">{errorMsg}</div>
    {/if}

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div>
            <label for="teamName" class="block text-sm font-medium text-gray-700 mb-1">Назва команди</label>
            <input
                    id="teamName"
                    type="text"
                    bind:value={teamName}
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Code Warriors"
            />
        </div>

        <div>
            <label for="city" class="block text-sm font-medium text-gray-700 mb-1">Місто / організація</label>
            <input
                    id="city"
                    type="text"
                    bind:value={city}
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Київ"
            />
        </div>

        <div>
            <label for="contact" class="block text-sm font-medium text-gray-700 mb-1">Telegram / Discord</label>
            <input
                    id="contact"
                    type="text"
                    bind:value={contact}
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="@username"
            />
        </div>

        <div>
            <p class="text-sm font-medium text-gray-700 mb-2">Учасники (мін. 2, макс. 10)</p>
            <div class="space-y-2">
                {#each members as member, i}
                    <div class="flex gap-2">
                        <input
                                type="text"
                                bind:value={member.name}
                                class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ім'я"
                        />
                        <input
                                type="email"
                                bind:value={member.email}
                                class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="email@example.com"
                        />
                        {#if members.length > 2}
                            <button
                                    onclick={() => removeMember(i)}
                                    class="text-red-500 hover:text-red-700 px-2"
                            >✕</button>
                        {/if}
                    </div>
                {/each}
            </div>
            {#if members.length < 10}
                <button
                        onclick={addMember}
                        class="mt-2 text-blue-600 hover:underline text-sm"
                >
                    + Додати учасника
                </button>
            {/if}
        </div>

        <button
                onclick={handleSubmit}
                disabled={loading}
                class="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
            {loading ? 'Реєстрація...' : 'Зареєструватися'}
        </button>
    </div>
</div>