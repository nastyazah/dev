import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import type { TaskStatus } from '@prisma/client';

export const GET: RequestHandler = async ({ params }) => {
    const id = params.id;
    if (!id) throw error(400, 'ID не вказано');

    const task = await prisma.task.findUnique({
        where: { id },
        include: {
            tournament: { select: { id: true, title: true, status: true } },
            submissions: {
                include: {
                    team: { select: { id: true, name: true } }
                }
            }
        }
    });

    if (!task) throw error(404, 'Завдання не знайдено');

    return json(task);
};

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
    const id = params.id;
    if (!id) throw error(400, 'ID не вказано');

    if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
    if (locals.user.role !== 'ADMIN') return json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();

    const task = await prisma.task.update({
        where: { id },
        data: { status: body.status as TaskStatus }
    });

    return json(task);
};