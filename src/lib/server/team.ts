import { prisma } from './db';

export async function getTeamsByTournament(tournamentId: string) {
    return prisma.team.findMany({
        where: { tournamentId },
        include: {
            captain: { select: { id: true, name: true, email: true } },
            members: true,
            _count: { select: { members: true } }
        },
        orderBy: { createdAt: 'asc' }
    });
}

export async function getTeamById(id: string) {
    return prisma.team.findUnique({
        where: { id },
        include: {
            captain: { select: { id: true, name: true, email: true } },
            members: true,
            tournament: true,
            submissions: {
                include: { task: true }
            }
        }
    });
}

export async function createTeam(data: {
    name: string;
    city?: string;
    contact?: string;
    captainId: string;
    tournamentId: string;
    members: { name: string; email: string }[];
}) {
    const { members, ...teamData } = data;

    return prisma.team.create({
        data: {
            ...teamData,
            members: {
                create: members
            }
        },
        include: { members: true }
    });
}

export async function isRegistrationOpen(tournamentId: string): Promise<boolean> {
    const tournament = await prisma.tournament.findUnique({
        where: { id: tournamentId },
        select: { regStart: true, regEnd: true, status: true, maxTeams: true }
    });

    if (!tournament || tournament.status !== 'REGISTRATION') return false;

    const now = new Date();
    if (now < tournament.regStart || now > tournament.regEnd) return false;

    if (tournament.maxTeams) {
        const count = await prisma.team.count({ where: { tournamentId } });
        if (count >= tournament.maxTeams) return false;
    }

    return true;
}