// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import { getTournaments } from '$lib/server/tournament';

export const load: PageServerLoad = async () => {
    const registration = await getTournaments('REGISTRATION');
    const running = await getTournaments('RUNNING');
    const finished = await getTournaments('FINISHED');

    return { registration, running, finished };
};