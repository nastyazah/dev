import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { createOrUpdateSubmission, getSubmissionByTeam } from '$lib/server/submission';
import { submissionSchema } from '$lib/validation';

export const GET: RequestHandler = async ({ url, locals }) => {
    if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });

    const taskId = url.searchParams.get('taskId');
    const teamId = url.searchParams.get('teamId');
    if (!taskId || !teamId) throw error(400, 'taskId та teamId обовязкові');

    const submission = await getSubmissionByTeam(taskId, teamId);
    return json(submission);
};

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const result = submissionSchema.safeParse(body);

    if (!result.success) {
        return json({ error: result.error.flatten() }, { status: 422 });
    }

    try {
        const submission = await createOrUpdateSubmission(result.data);
        return json(submission, { status: 201 });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Помилка сервера';
        return json({ error: message }, { status: 400 });
    }
};