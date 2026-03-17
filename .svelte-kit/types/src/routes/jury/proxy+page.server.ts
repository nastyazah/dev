// @ts-nocheck
// src/routes/jury/+page.server.ts
import type { PageServerLoad } from './$types';
import { requireJury } from '$lib/server/middleware';
import { getJuryAssignments } from '$lib/server/scoring';

export const load = async (event: Parameters<PageServerLoad>[0]) => {
    const user = requireJury(event);
    const assignments = await getJuryAssignments(user.id);
    return { assignments };
};