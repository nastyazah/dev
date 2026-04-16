// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { auth } from '$lib/server/auth';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Очистка даних
    await prisma.score.deleteMany();
    await prisma.juryAssignment.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.teamMember.deleteMany();
    await prisma.team.deleteMany();
    await prisma.task.deleteMany();
    await prisma.tournament.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();

    console.log('👥 Creating users...');

    // Створення Адміна
    const adminRes = await auth.api.signUpEmail({
        body: { email: 'admin@sfl.org.ua', password: 'password123', name: 'Адміністратор SFL' }
    });
    if (adminRes) {
        await prisma.user.update({
            where: { id: adminRes.user.id },
            data: { role: 'ADMIN' } // Виправлено TS2322
        });
    }

    // Створення Журі 1
    const jury1Res = await auth.api.signUpEmail({
        body: { email: 'katya@sigmasoftware.com', password: 'password123', name: 'Катерина Зибіна' }
    });
    if (jury1Res) {
        await prisma.user.update({
            where: { id: jury1Res.user.id },
            data: { role: 'JURY' }
        });
    }

    // Створення Журі 2
    const jury2Res = await auth.api.signUpEmail({
        body: { email: 'sergii@google.com', password: 'password123', name: 'Сергій Кашубін' }
    });
    if (jury2Res) {
        await prisma.user.update({
            where: { id: jury2Res.user.id },
            data: { role: 'JURY' }
        });
    }

    // Створення Капітанів
    const captain1Res = await auth.api.signUpEmail({
        body: { email: 'captain1@example.com', password: 'password123', name: 'Олександр Петренко' }
    });

    const captain2Res = await auth.api.signUpEmail({
        body: { email: 'captain2@example.com', password: 'password123', name: 'Марія Іваненко' }
    });

    // Турнір
    console.log('🏆 Creating tournament...');
    const tournament = await prisma.tournament.create({
        data: {
            title: 'SFL Tournament 2026',
            description: 'Турнір з програмування для студентів та молодих спеціалістів',
            status: 'REGISTRATION',
            regStart: new Date('2026-03-01'),
            regEnd: new Date('2026-03-15'),
            maxTeams: 50,
            adminId: adminRes?.user.id ?? ''
        }
    });

    // Команди
    console.log('👥 Creating teams...');
    const team1 = await prisma.team.create({
        data: {
            name: 'Code Warriors',
            captainId: captain1Res?.user.id ?? '',
            tournamentId: tournament.id,
            city: 'Київ',
            contact: '@codewarriors',
            members: {
                create: [
                    { name: 'Дмитро Мельник', email: 'dmytro@example.com' },
                    { name: 'Оксана Шевченко', email: 'oksana@example.com' }
                ]
            }
        }
    });

    const team2 = await prisma.team.create({
        data: {
            name: 'Digital Dragons',
            captainId: captain2Res?.user.id ?? '',
            tournamentId: tournament.id,
            city: 'Львів',
            contact: '@digitaldragon',
            members: {
                create: [
                    { name: 'Анна Кравченко', email: 'anna@example.com' },
                    { name: 'Сергій Лисенко', email: 'sergiy@example.com' }
                ]
            }
        }
    });

    // Завдання
    console.log('📝 Creating task...');
    const task = await prisma.task.create({
        data: {
            title: 'Веб-додаток для управління турнірами',
            description: 'Створити повнофункціональну платформу для проведення турнірів',
            requirements: [
                'Backend API з автентифікацією',
                'Frontend інтерфейс з адаптивним дизайном',
                'База даних з правильними звязками',
                'Система оцінювання робіт',
                'Документація та тести'
            ],
            techStack: 'SvelteKit, TypeScript, PostgreSQL, Tailwind CSS',
            startAt: new Date('2026-03-16'),
            deadline: new Date('2026-04-15'),
            status: 'ACTIVE',
            tournamentId: tournament.id
        }
    });

    // Сабміти (Виправлено типи TS2322)
    console.log('📤 Creating submissions...');
    const sub1 = await prisma.submission.create({
        data: {
            githubUrl: 'https://github.com/codewarriors/tournament-platform',
            videoUrl: 'https://youtube.com/watch?v=demo1',
            demoUrl: 'https://codewarriors-demo.vercel.app',
            description: 'Повнофункціональна платформа з реалтайм оновленнями',
            taskId: task.id,
            teamId: team1.id
        }
    });

    const sub2 = await prisma.submission.create({
        data: {
            githubUrl: 'https://github.com/digitaldragon/tourney-app',
            videoUrl: 'https://youtube.com/watch?v=demo2',
            description: 'Елегантне рішення з фокусом на UX',
            taskId: task.id,
            teamId: team2.id
        }
    });

    // Призначення журі
    console.log('⚖️  Assigning jury...');
    const assign1 = await prisma.juryAssignment.create({
        data: { submissionId: sub1.id, juryId: jury1Res?.user.id ?? '' }
    });

    const assign2 = await prisma.juryAssignment.create({
        data: { submissionId: sub1.id, juryId: jury2Res?.user.id ?? '' }
    });

    const assign3 = await prisma.juryAssignment.create({
        data: { submissionId: sub2.id, juryId: jury1Res?.user.id ?? '' }
    });

    // Оцінки
    console.log('📊 Creating scores...');
    await prisma.score.create({
        data: {
            assignmentId: assign1.id,
            backendQuality: 85,
            databaseQuality: 90,
            frontendQuality: 88,
            functionality: 92,
            stability: 85,
            usability: 87,
            total: 87.8,
            comment: 'Відмінна робота!'
        }
    });

    await prisma.score.create({
        data: {
            assignmentId: assign3.id,
            backendQuality: 80,
            databaseQuality: 85,
            frontendQuality: 92,
            functionality: 85,
            stability: 88,
            usability: 95,
            total: 87.5,
            comment: 'Прекрасний дизайн!'
        }
    });

    console.log('✅ Done!');
    // Використання змінних, щоб не було варнінгів TS6133
    console.log(`Debug info: ${assign2.id}, ${sub2.id}`);
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());