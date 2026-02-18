// src/routes/api/scores/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { submitScore, getJuryAssignments, assignJuryToSubmissions } from '$lib/server/scoring';
import { scoreSchema } from '$lib/validation';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
    if (locals.user.role !== 'JURY') return json({ error: 'Forbidden' }, { status: 403 });

    const assignments = await getJuryAssignments(locals.user.id);
    return json(assignments);
};

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
    if (locals.user.role !== 'JURY') return json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const result = scoreSchema.safeParse(body);

    if (!result.success) {
        return json({ error: result.error.flatten() }, { status: 422 });
    }

    try {
        const score = await submitScore(result.data);
        return json(score, { status: 201 });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Помилка сервера';
        return json({ error: message }, { status: 400 });
    }
};

export const PUT: RequestHandler = async ({ request, locals }) => {
    if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
    if (locals.user.role !== 'ADMIN') return json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    if (!body.taskId) throw error(400, 'taskId не вказано');

    await assignJuryToSubmissions(body.taskId, body.minJuryPerSubmission ?? 2);
    return json({ success: true });
};