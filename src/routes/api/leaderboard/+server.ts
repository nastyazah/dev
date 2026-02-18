import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getLeaderboard } from '$lib/server/scoring';

export const GET: RequestHandler = async ({ url }) => {
    const tournamentId = url.searchParams.get('tournamentId');
    if (!tournamentId) throw error(400, 'tournamentId не вказано');

    const leaderboard = await getLeaderboard(tournamentId);
    return json(leaderboard);
};