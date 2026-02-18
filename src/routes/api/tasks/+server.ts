// src/routes/api/tasks/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { taskSchema } from '$lib/validation';

export const GET: RequestHandler = async ({ url }) => {
    const tournamentId = url.searchParams.get('tournamentId');
    if (!tournamentId) throw error(400, 'tournamentId не вказано');

    const tasks = await prisma.task.findMany({
        where: { tournamentId },
        orderBy: { createdAt: 'desc' }
    });

    return json(tasks);
};

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
    if (locals.user.role !== 'ADMIN') return json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const result = taskSchema.safeParse(body);

    if (!result.success) {
        return json({ error: result.error.flatten() }, { status: 422 });
    }

    const task = await prisma.task.create({
        data: {
            ...result.data,
            startAt: new Date(result.data.startAt),
            deadline: new Date(result.data.deadline)
        }
    });

    return json(task, { status: 201 });
};