import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Початок наповнення бази даних...');

    // 1. Очищення даних у строгому порядку
    console.log('🗑️ Видалення старих записів...');
    await prisma.score.deleteMany({});
    await prisma.juryAssignment.deleteMany({});
    await prisma.submission.deleteMany({});
    await prisma.teamMember.deleteMany({});
    await prisma.team.deleteMany({});
    await prisma.task.deleteMany({});
    await prisma.tournament.deleteMany({});
    await prisma.user.deleteMany({});

    const hashedPassword = await bcrypt.hash('password123', 10);

    // 2. Створення основних користувачів
    console.log('👥 Створення користувачів...');
    const admin = await prisma.user.create({
        data: { email: 'admin@sfl.org.ua', password: hashedPassword, name: 'Адміністратор SFL', role: 'ADMIN' }
    });

    const jury1 = await prisma.user.create({
        data: { email: 'katya@sigmasoftware.com', password: hashedPassword, name: 'Катерина Зибіна', role: 'JURY' }
    });

    const captain1 = await prisma.user.create({
        data: { email: 'captain1@example.com', password: hashedPassword, name: 'Олександр Петренко', role: 'TEAM' }
    });

    // 3. Турнір та Завдання
    console.log('🏆 Створення турніру та завдання...');
    const tournament = await prisma.tournament.create({
        data: {
            title: 'SFL Tournament 2026',
            description: 'Турнір з програмування',
            status: 'REGISTRATION',
            regStart: new Date('2026-03-01'),
            regEnd: new Date('2026-03-15')
        }
    });

    const task = await prisma.task.create({
        data: {
            title: 'Веб-додаток SFL',
            description: 'Платформа для управління турніром',
            requirements: ['SvelteKit', 'PostgreSQL'],
            status: 'ACTIVE',
            startAt: new Date('2026-03-16'),
            deadline: new Date('2026-04-15'),
            tournamentId: tournament.id
        }
    });

    // 4. Команда та учасники
    console.log('👥 Створення команди...');
    const team = await prisma.team.create({
        data: {
            name: 'Code Warriors',
            captainId: captain1.id,
            tournamentId: tournament.id,
            city: 'Київ'
        }
    });

    await prisma.teamMember.create({
        data: { teamId: team.id, name: 'Дмитро Мельник', email: 'dmytro@example.com' }
    });

    // 5. Сабміт (Submission)
    console.log('📤 Створення сабміту...');
    const submission = await prisma.submission.create({
        data: {
            githubUrl: 'https://github.com/codewarriors/sfl-project',
            description: 'Готовий прототип',
            taskId: task.id,
            teamId: team.id
        }
    });

    // 6. Призначення журі та оцінка
    console.log('⚖️ Призначення журі та оцінювання...');
    const assignment = await prisma.juryAssignment.create({
        data: {
            submissionId: submission.id,
            juryId: jury1.id
        }
    });

    await prisma.score.create({
        data: {
            assignmentId: assignment.id,
            backendQuality: 90,
            databaseQuality: 85,
            frontendQuality: 88,
            functionality: 92,
            stability: 85,
            usability: 87,
            total: 87.8,
            comment: 'Відмінна робота!'
        }
    });

    console.log('✅ Наповнення завершено успішно!');
}

main()
    .catch((e) => {
        console.error('❌ Помилка під час сидування:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });