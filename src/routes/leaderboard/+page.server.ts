// src/routes/leaderboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { getLeaderboard } from '$lib/server/scoring';
import { getTournaments } from '$lib/server/tournament';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
    const running = await getTournaments('RUNNING');
    const finished = await getTournaments('FINISHED');
    const all = [...running, ...finished];

    const tournamentId = url.searchParams.get('tournamentId') ?? all[0]?.id ?? null;
    if (!tournamentId) throw error(404, 'Немає активних турнірів');

    const leaderboard = await getLeaderboard(tournamentId);

    return { leaderboard, tournaments: all, tournamentId };
};