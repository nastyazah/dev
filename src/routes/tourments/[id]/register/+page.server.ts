// src/routes/tournaments/[id]/register/+page.server.ts
import type { PageServerLoad } from './$types';
import { requireAuth } from '$lib/server/middleware';
import { getTournamentById } from '$lib/server/tournament';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    requireAuth(event);

    const tournament = await getTournamentById(event.params.id);
    if (!tournament) throw error(404, 'Турнір не знайдено');
    if (tournament.status !== 'REGISTRATION') throw error(400, 'Реєстрація закрита');

    return { tournament };
};