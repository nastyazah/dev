// src/routes/admin/+page.server.ts
import type { PageServerLoad } from './$types';
import { requireAdmin } from '$lib/server/middleware';
import { getTournaments } from '$lib/server/tournament';

export const load: PageServerLoad = async (event) => {
    requireAdmin(event);

    const tournaments = await getTournaments();

    return { tournaments };
};