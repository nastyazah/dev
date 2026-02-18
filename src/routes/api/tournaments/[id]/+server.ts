// src/routes/api/tournaments/[id]/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getTournamentById, updateTournamentStatus } from '$lib/server/tournament';

export const GET: RequestHandler = async ({ params }) => {
    const id = params.id;
    if (!id) throw error(400, 'ID не вказано');

    const tournament = await getTournamentById(id);
    if (!tournament) throw error(404, 'Турнір не знайдено');

    return json(tournament);
};

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
    const id = params.id;
    if (!id) throw error(400, 'ID не вказано');

    if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
    if (locals.user.role !== 'ADMIN') return json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const tournament = await updateTournamentStatus(id, body.status);

    return json(tournament);
};