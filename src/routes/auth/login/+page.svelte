<script lang="ts">
    import { signUp } from '$lib/auth-client';
    import { goto } from '$app/navigation';

    let name = $state('');
    let email = $state('');
    let password = $state('');
    let error = $state('');
    let loading = $state(false);

    async function handleSubmit() {
        loading = true;
        error = '';

        const result = await signUp.email({ name, email, password });

        if (result.error) {
            error = result.error.message ?? 'Помилка реєстрації';
        } else {
            await goto('/');
        }

        loading = false;
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Реєстрація</h1>

        {#if error}
            <p class="text-red-600 text-sm mb-4">{error}</p>
        {/if}

        <div class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Ім'я</label>
                <input
                        id="name"
                        type="text"
                        bind:value={name}
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Іван Петренко"
                />
            </div>

            <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                        id="email"
                        type="email"
                        bind:value={email}
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="you@example.com"
                />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                <input
                        id="password"
                        type="password"
                        bind:value={password}
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="мінімум 8 символів"
                />
            </div>

            <button
                    onclick={handleSubmit}
                    disabled={loading}
                    class="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
                {loading ? 'Завантаження...' : 'Зареєструватися'}
            </button>
        </div>

        <p class="mt-4 text-sm text-gray-600 text-center">
            Вже є акаунт? <a href="/auth/login" class="text-blue-600 hover:underline">Увійти</a>
        </p>
    </div>
</div>