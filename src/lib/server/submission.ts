import { prisma } from './db';

export async function getSubmissionsByTask(taskId: string) {
    return prisma.submission.findMany({
        where: { taskId },
        include: {
            team: { select: { id: true, name: true, city: true } },
            assignments: {
                include: {
                    jury: { select: { id: true, name: true } },
                    score: true
                }
            }
        }
    });
}

export async function getSubmissionByTeam(taskId: string, teamId: string) {
    return prisma.submission.findUnique({
        where: { taskId_teamId: { taskId, teamId } },
        include: {
            assignments: { include: { score: true } }
        }
    });
}

export async function createOrUpdateSubmission(data: {
    taskId: string;
    teamId: string;
    githubUrl: string;
    videoUrl: string;
    demoUrl?: string;
    description?: string;
}) {
    const task = await prisma.task.findUnique({
        where: { id: data.taskId },
        select: { deadline: true, status: true }
    });

    if (!task) throw new Error('Завдання не знайдено');
    if (task.status === 'SUBMISSION_CLOSED' || task.status === 'EVALUATED') {
        throw new Error('Прийом робіт закрито');
    }
    if (new Date() > task.deadline) {
        throw new Error('Дедлайн минув');
    }

    return prisma.submission.upsert({
        where: { taskId_teamId: { taskId: data.taskId, teamId: data.teamId } },
        create: data,
        update: {
            githubUrl: data.githubUrl,
            videoUrl: data.videoUrl,
            demoUrl: data.demoUrl,
            description: data.description
        }
    });
}