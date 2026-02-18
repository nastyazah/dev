// src/routes/api/teams/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getTeamsByTournament, createTeam, isRegistrationOpen } from '$lib/server/team';
import { teamSchema } from '$lib/validation';

export const GET: RequestHandler = async ({ url }) => {
    const tournamentId = url.searchParams.get('tournamentId');
    if (!tournamentId) throw error(400, 'tournamentId не вказано');

    const teams = await getTeamsByTournament(tournamentId);
    return json(teams);
};

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const result = teamSchema.safeParse(body);

    if (!result.success) {
        return json({ error: result.error.flatten() }, { status: 422 });
    }

    const open = await isRegistrationOpen(result.data.tournamentId);
    if (!open) return json({ error: 'Реєстрація закрита' }, { status: 400 });

    const team = await createTeam({
        ...result.data,
        captainId: locals.user.id
    });

    return json(team, { status: 201 });
};