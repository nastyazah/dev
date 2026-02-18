import { prisma } from './db';
import type { TournamentStatus } from '@prisma/client';

export async function getTournaments(status?: TournamentStatus) {
    return prisma.tournament.findMany({
        where: status ? { status } : undefined,
        include: {
            admin: { select: { id: true, name: true, email: true } },
            _count: { select: { teams: true, tasks: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getTournamentById(id: string) {
    return prisma.tournament.findUnique({
        where: { id },
        include: {
            admin: { select: { id: true, name: true, email: true } },
            teams: {
                include: {
                    captain: { select: { id: true, name: true, email: true } },
                    _count: { select: { members: true } }
                }
            },
            tasks: true
        }
    });
}

export async function createTournament(data: {
    title: string;
    description: string;
    regStart: Date;
    regEnd: Date;
    maxTeams?: number;
    adminId: string;
}) {
    return prisma.tournament.create({ data });
}

export async function updateTournamentStatus(id: string, status: TournamentStatus) {
    return prisma.tournament.update({
        where: { id },
        data: { status }
    });
}