// src/routes/profile/+page.server.ts
import type { PageServerLoad } from './$types';
import { requireAuth } from '$lib/server/middleware';
import { prisma } from '$lib/server/db';

export const load: PageServerLoad = async (event) => {
    const user = requireAuth(event);

    const fullUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
            captainOf: {
                include: {
                    tournament: { select: { id: true, title: true } },
                    members: true,
                    submissions: { include: { task: true } }
                }
            },
            juryScores: {
                include: {
                    submission: {
                        include: { team: { select: { id: true, name: true } } }
                    },
                    score: true
                }
            }
        }
    });

    return { profile: fullUser };
};