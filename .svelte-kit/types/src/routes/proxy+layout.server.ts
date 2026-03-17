// @ts-nocheck
// src/routes/+layout.server.ts
import type { ServerLoad } from '@sveltejs/kit';

export const load = async ({ locals }: Parameters<ServerLoad>[0]) => {
    return {
        user: locals.user
    };
};