// src/routes/api/tournaments/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getTournaments, createTournament } from '$lib/server/tournament';
import { tournamentSchema } from '$lib/validation';

export const GET: RequestHandler = async ({ url }) => {
    const status = url.searchParams.get('status') as 'DRAFT' | 'REGISTRATION' | 'RUNNING' | 'FINISHED' | null;
    const tournaments = await getTournaments(status ?? undefined);
    return json(tournaments);
};

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
    if (locals.user.role !== 'ADMIN') return json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const result = tournamentSchema.safeParse(body);

    if (!result.success) {
        return json({ error: result.error.flatten() }, { status: 422 });
    }

    const tournament = await createTournament({
        ...result.data,
        regStart: new Date(result.data.regStart),
        regEnd: new Date(result.data.regEnd),
        adminId: locals.user.id
    });

    return json(tournament, { status: 201 });
};