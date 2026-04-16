<script lang="ts">
    import type { JuryAssignment, Score, Submission, Team, Task } from '@prisma/client';

    type Assignment = JuryAssignment & {
        score: Score | null;
        submission: Submission & {
            team: Pick<Team, 'id' | 'name'>;
            task: Pick<Task, 'id' | 'title' | 'requirements'>;
        };
    };

    let { data }: { data: { assignment: Assignment } } = $props();

    let backendQuality = $state(data.assignment.score?.backendQuality ?? 50);
    let databaseQuality = $state(data.assignment.score?.databaseQuality ?? 50);
    let frontendQuality = $state(data.assignment.score?.frontendQuality ?? 50);
    let functionality = $state(data.assignment.score?.functionality ?? 50);
    let stability = $state(data.assignment.score?.stability ?? 50);
    let usability = $state(data.assignment.score?.usability ?? 50);
    let comment = $state(data.assignment.score?.comment ?? '');
    let loading = $state(false);
    let success = $state(false);
    let errorMsg = $state('');

    const total = $derived(
        (backendQuality + databaseQuality + frontendQuality + functionality + stability + usability) / 6
    );

    async function handleSubmit() {
        loading = true;
        errorMsg = '';
        const res = await fetch('/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                assignmentId: data.assignment.id,
                backendQuality, databaseQuality, frontendQuality,
                functionality, stability, usability, comment
            })
        });
        if (res.ok) { success = true; }
        else { const b = await res.json(); errorMsg = b.error ?? 'Помилка'; }
        loading = false;
    }

    const criteria = [
        { id: 'backendQuality', label: 'Backend якість' },
        { id: 'databaseQuality', label: 'База даних' },
        { id: 'frontendQuality', label: 'Frontend якість' },
        { id: 'functionality', label: 'Функціональність' },
        { id: 'stability', label: 'Стабільність' },
        { id: 'usability', label: 'Зручність' }
    ];

    function getScore(id: string): number {
        const map: Record<string, number> = {
            backendQuality, databaseQuality, frontendQuality,
            functionality, stability, usability
        };
        return map[id] ?? 0;
    }

    function setScore(id: string, value: number) {
        if (id === 'backendQuality') backendQuality = value;
        else if (id === 'databaseQuality') databaseQuality = value;
        else if (id === 'frontendQuality') frontendQuality = value;
        else if (id === 'functionality') functionality = value;
        else if (id === 'stability') stability = value;
        else if (id === 'usability') usability = value;
    }
</script>

<div class="max-w-3xl mx-auto px-4 py-8">
    <a href="/jury" class="text-blue-600 hover:underline text-sm mb-6 block">← Назад</a>

    <h1 class="text-2xl font-bold text-gray-900 mb-2">Оцінювання роботи</h1>
    <p class="text-gray-500 mb-6">{data.assignment.submission.team.name}</p>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 class="font-semibold text-gray-900 mb-3">{data.assignment.submission.task.title}</h2>
        <div class="flex gap-4 text-sm">
            <a href={data.assignment.submission.githubUrl} target="_blank" class="text-blue-600 hover:underline">GitHub →</a>
            <a href={data.assignment.submission.videoUrl} target="_blank" class="text-blue-600 hover:underline">Відео →</a>
            {#if data.assignment.submission.demoUrl}
                <a href={data.assignment.submission.demoUrl} target="_blank" class="text-blue-600 hover:underline">Demo →</a>
            {/if}
        </div>
    </div>

    {#if success}
        <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-green-700">Оцінку збережено!</div>
    {/if}
    {#if errorMsg}
        <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700">{errorMsg}</div>
    {/if}

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
            <h2 class="font-semibold text-gray-900">Оцінки (0-100)</h2>
            <span class="text-2xl font-bold text-blue-600">{total.toFixed(1)}</span>
        </div>

        <div class="space-y-4 mb-6">
            {#each criteria as criterion}
                <div>
                    <div class="flex justify-between text-sm mb-1">
                        <label for={criterion.id} class="text-gray-700">{criterion.label}</label>
                        <span class="font-medium">{getScore(criterion.id)}</span>
                    </div>
                    <input
                            id={criterion.id}
                            type="range"
                            min="0"
                            max="100"
                            value={getScore(criterion.id)}
                            oninput={(e) => setScore(criterion.id, Number(e.currentTarget.value))}
                            class="w-full"
                    />
                </div>
            {/each}
        </div>

        <div class="mb-6">
            <label for="comment" class="block text-sm text-gray-700 mb-1">Коментар</label>
            <textarea
                    id="comment"
                    bind:value={comment}
                    rows="3"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
        </div>

        <button
                onclick={handleSubmit}
                disabled={loading}
                class="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
            {loading ? 'Збереження...' : 'Зберегти оцінку'}
        </button>
    </div>
</div>