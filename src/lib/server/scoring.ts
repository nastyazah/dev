import { prisma } from './db';

export async function assignJuryToSubmissions(taskId: string, minJuryPerSubmission = 2) {
    const submissions = await prisma.submission.findMany({ where: { taskId } });
    const jurors = await prisma.user.findMany({ where: { role: 'JURY' } });

    if (jurors.length === 0) throw new Error('Немає членів журі');

    for (const submission of submissions) {
        const shuffled = [...jurors].sort(() => Math.random() - 0.5);
        const assigned = shuffled.slice(0, minJuryPerSubmission);

        for (const jury of assigned) {
            await prisma.juryAssignment.upsert({
                where: { submissionId_juryId: { submissionId: submission.id, juryId: jury.id } },
                create: { submissionId: submission.id, juryId: jury.id },
                update: {}
            });
        }
    }
}

export async function getJuryAssignments(juryId: string) {
    return prisma.juryAssignment.findMany({
        where: { juryId },
        include: {
            submission: {
                include: {
                    team: { select: { id: true, name: true } },
                    task: { select: { id: true, title: true, deadline: true } }
                }
            },
            score: true
        }
    });
}

export async function submitScore(data: {
    assignmentId: string;
    backendQuality: number;
    databaseQuality: number;
    frontendQuality: number;
    functionality: number;
    stability: number;
    usability: number;
    comment?: string;
}) {
    const { assignmentId, comment, ...scores } = data;

    const total =
        (scores.backendQuality +
            scores.databaseQuality +
            scores.frontendQuality +
            scores.functionality +
            scores.stability +
            scores.usability) /
        6;

    return prisma.score.upsert({
        where: { assignmentId },
        create: { assignmentId, ...scores, total, comment },
        update: { ...scores, total, comment }
    });
}

export async function getLeaderboard(tournamentId: string) {
    const teams = await prisma.team.findMany({
        where: { tournamentId },
        include: {
            submissions: {
                include: {
                    assignments: { include: { score: true } }
                }
            }
        }
    });

    return teams
        .map((team) => {
            const allScores = team.submissions.flatMap((s) =>
                s.assignments.flatMap((a) => (a.score ? [a.score.total] : []))
            );
            const average =
                allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;

            return { teamId: team.id, teamName: team.name, average, scoresCount: allScores.length };
        })
        .sort((a, b) => b.average - a.average);
}