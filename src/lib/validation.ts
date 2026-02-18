import { z } from 'zod';

export const tournamentSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10),
    regStart: z.string().datetime(),
    regEnd: z.string().datetime(),
    maxTeams: z.number().int().positive().optional()
});

export const teamSchema = z.object({
    name: z.string().min(2).max(50),
    tournamentId: z.string().cuid(),
    city: z.string().optional(),
    contact: z.string().optional(),
    members: z
        .array(
            z.object({
                name: z.string().min(2),
                email: z.string().email()
            })
        )
        .min(2, 'Мінімум 2 учасники')
        .max(10, 'Максимум 10 учасників')
});

export const submissionSchema = z.object({
    taskId: z.string().cuid(),
    teamId: z.string().cuid(),
    githubUrl: z.string().url(),
    videoUrl: z.string().url(),
    demoUrl: z.string().url().optional(),
    description: z.string().max(500).optional()
});

export const scoreSchema = z.object({
    assignmentId: z.string().cuid(),
    backendQuality: z.number().int().min(0).max(100),
    databaseQuality: z.number().int().min(0).max(100),
    frontendQuality: z.number().int().min(0).max(100),
    functionality: z.number().int().min(0).max(100),
    stability: z.number().int().min(0).max(100),
    usability: z.number().int().min(0).max(100),
    comment: z.string().max(1000).optional()
});

export const taskSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10),
    requirements: z.array(z.string()).min(1),
    techStack: z.string().optional(),
    startAt: z.string().datetime(),
    deadline: z.string().datetime(),
    tournamentId: z.string().cuid()
});