// src/routes/api/teams/[id]/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getTeamById } from '$lib/server/team';

export const GET: RequestHandler = async ({ params }) => {
    const id = params.id;
    if (!id) throw error(400, 'ID не вказано');

    const team = await getTeamById(id);
    if (!team) throw error(404, 'Команду не знайдено');

    return json(team);
};