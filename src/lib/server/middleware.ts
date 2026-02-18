import { redirect } from '@sveltejs/kit';
import type { ServerLoadEvent } from '@sveltejs/kit';

export function requireAuth(event: ServerLoadEvent) {
    if (!event.locals.user) {
        throw redirect(302, '/auth/login');
    }
    return event.locals.user;
}

export function requireAdmin(event: ServerLoadEvent) {
    const user = requireAuth(event);
    if (user.role !== 'ADMIN') {
        throw redirect(302, '/');
    }
    return user;
}

export function requireJury(event: ServerLoadEvent) {
    const user = requireAuth(event);
    if (user.role !== 'JURY') {
        throw redirect(302, '/');
    }
    return user;
}

export function requireTeam(event: ServerLoadEvent) {
    const user = requireAuth(event);
    if (user.role !== 'TEAM') {
        throw redirect(302, '/');
    }
    return user;
}