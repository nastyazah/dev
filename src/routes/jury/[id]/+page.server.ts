import type { PageServerLoad } from './$types';
import { requireJury } from '$lib/server/middleware';
import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    requireJury(event);

    const id = event.params.id;

    const assignment = await prisma.juryAssignment.findUnique({
        where: { id },
        include: {
            submission: {
                include: {
                    team: { select: { id: true, name: true, city: true } },
                    task: { select: { id: true, title: true, requirements: true } }
                }
            },
            score: true
        }
    });

    if (!assignment) throw error(404, 'Призначення не знайдено');

    return { assignment };
};