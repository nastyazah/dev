// src/routes/tournaments/[id]/+page.server.ts
import type { PageServerLoad } from './$types';
import { getTournamentById } from '$lib/server/tournament';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const tournament = await getTournamentById(params.id);
    if (!tournament) throw error(404, 'Турнір не знайдено');
    return { tournament };
};