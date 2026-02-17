// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Clear existing data (розкоментувати якщо потрібно)
    console.log('🗑️  Clearing existing data...');
    await prisma.score.deleteMany();
    await prisma.juryAssignment.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.teamMember.deleteMany();
    await prisma.team.deleteMany();
    await prisma.task.deleteMany();
    await prisma.tournament.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Створення користувачів
    console.log('👥 Creating users...');

    // Адміністратор
    const admin = await prisma.user.create({
        data: {
            email: 'admin@sfl.org.ua',
            password: hashedPassword,
            name: 'Адміністратор SFL',
            role: 'ADMIN'
        }
    });

    // Журі
    const juryMembers = await Promise.all([
        prisma.user.create({
            data: {
                email: 'katya@sigmasoftware.com',
                password: hashedPassword,
                name: 'Катерина Зибіна',
                role: 'JURY'
            }
        }),
        prisma.user.create({
            data: {
                email: 'sergii@google.com',
                password: hashedPassword,
                name: 'Сергій Кашубін',
                role: 'JURY'
            }
        }),
        prisma.user.create({
            data: {
                email: 'olena@tietoevry.com',
                password: hashedPassword,
                name: 'Олена Кот',
                role: 'JURY'
            }
        })
    ]);

    // Капітани команд
    const captains = await Promise.all([
        prisma.user.create({
            data: {
                email: 'captain1@example.com',
                password: hashedPassword,
                name: 'Олександр Петренко',
                role: 'TEAM'
            }
        }),
        prisma.user.create({
            data: {
                email: 'captain2@example.com',
                password: hashedPassword,
                name: 'Марія Іваненко',
                role: 'TEAM'
            }
        }),
        prisma.user.create({
            data: {
                email: 'captain3@example.com',
                password: hashedPassword,
                name: 'Андрій Коваленко',
                role: 'TEAM'
            }
        })
    ]);

    // 2. Створення турніру
    console.log('🏆 Creating tournament...');
    const tournament = await prisma.tournament.create({
        data: {
            title: 'SFL Tournament 2026',
            description: 'Турнір з програмування для студентів та молодих спеціалістів',
            status: 'REGISTRATION',
            regStart: new Date('2026-03-01'),
            regEnd: new Date('2026-03-15'),
            maxTeams: 50
        }
    });

    // 3. Створення команд
    console.log('👥 Creating teams...');
    const teams = await Promise.all([
        prisma.team.create({
            data: {
                name: 'Code Warriors',
                captainId: captains[0].id,
                tournamentId: tournament.id,
                city: 'Київ',
                contact: '@codewarriors'
            }
        }),
        prisma.team.create({
            data: {
                name: 'Digital Dragons',
                captainId: captains[1].id,
                tournamentId: tournament.id,
                city: 'Львів',
                contact: '@digitaldragon'
            }
        }),
        prisma.team.create({
            data: {
                name: 'Byte Busters',
                captainId: captains[2].id,
                tournamentId: tournament.id,
                city: 'Харків',
                contact: '@bytebusters'
            }
        })
    ]);

    // 4. Додання учасників до команд
    console.log('👨‍💻 Adding team members...');
    await Promise.all([
        // Team 1 members
        prisma.teamMember.createMany({
            data: [
                { teamId: teams[0].id, name: 'Дмитро Мельник', email: 'dmytro@example.com' },
                { teamId: teams[0].id, name: 'Оксана Шевченко', email: 'oksana@example.com' },
                { teamId: teams[0].id, name: 'Володимир Тимошенко', email: 'volodymyr@example.com' }
            ]
        }),
        // Team 2 members
        prisma.teamMember.createMany({
            data: [
                { teamId: teams[1].id, name: 'Анна Кравченко', email: 'anna@example.com' },
                { teamId: teams[1].id, name: 'Сергій Лисенко', email: 'sergiy@example.com' }
            ]
        }),
        // Team 3 members
        prisma.teamMember.createMany({
            data: [
                { teamId: teams[2].id, name: 'Юлія Бондаренко', email: 'yulia@example.com' },
                { teamId: teams[2].id, name: 'Ігор Савченко', email: 'igor@example.com' },
                { teamId: teams[2].id, name: 'Тетяна Попова', email: 'tetiana@example.com' },
                { teamId: teams[2].id, name: 'Микола Гриценко', email: 'mykola@example.com' }
            ]
        })
    ]);

    // 5. Створення завдання
    console.log('📝 Creating task...');
    const task = await prisma.task.create({
        data: {
            title: 'Веб-додаток для управління турнірами',
            description: 'Створити повнофункціональну платформу для проведення турнірів з програмування',
            requirements: [
                'Backend API з автентифікацією',
                'Frontend інтерфейс з адаптивним дизайном',
                'База даних з правильними зв\'язками',
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

    // 6. Створення сабмітів
    console.log('📤 Creating submissions...');
    const submissions = await Promise.all([
        prisma.submission.create({
            data: {
                githubUrl: 'https://github.com/codewarriors/tournament-platform',
                videoUrl: 'https://youtube.com/watch?v=demo1',
                demoUrl: 'https://codewarriors-demo.vercel.app',
                description: 'Повнофункціональна платформа з реалтайм оновленнями та адаптивним дизайном',
                taskId: task.id,
                teamId: teams[0].id
            }
        }),
        prisma.submission.create({
            data: {
                githubUrl: 'https://github.com/digitaldragon/tourney-app',
                videoUrl: 'https://youtube.com/watch?v=demo2',
                description: 'Елегантне рішення з фокусом на UX та продуктивність',
                taskId: task.id,
                teamId: teams[1].id
            }
        }),
        prisma.submission.create({
            data: {
                githubUrl: 'https://github.com/bytebusters/competition-manager',
                videoUrl: 'https://youtube.com/watch?v=demo3',
                demoUrl: 'https://bytebusters-demo.netlify.app',
                description: 'Масштабоване рішення з мікросервісною архітектурою',
                taskId: task.id,
                teamId: teams[2].id
            }
        })
    ]);

    // 7. Призначення журі до сабмітів
    console.log('⚖️ Assigning jury to submissions...');
    const assignments = await Promise.all([
        // Submission 1 - два журі
        prisma.juryAssignment.create({
            data: {
                submissionId: submissions[0].id,
                juryId: juryMembers[0].id
            }
        }),
        prisma.juryAssignment.create({
            data: {
                submissionId: submissions[0].id,
                juryId: juryMembers[1].id
            }
        }),
        // Submission 2 - два журі
        prisma.juryAssignment.create({
            data: {
                submissionId: submissions[1].id,
                juryId: juryMembers[1].id
            }
        }),
        prisma.juryAssignment.create({
            data: {
                submissionId: submissions[1].id,
                juryId: juryMembers[2].id
            }
        }),
        // Submission 3 - два журі
        prisma.juryAssignment.create({
            data: {
                submissionId: submissions[2].id,
                juryId: juryMembers[0].id
            }
        }),
        prisma.juryAssignment.create({
            data: {
                submissionId: submissions[2].id,
                juryId: juryMembers[2].id
            }
        })
    ]);

    // 8. Створення оцінок
    console.log('📊 Creating scores...');
    await Promise.all([
        // Scores for submission 1
        prisma.score.create({
            data: {
                assignmentId: assignments[0].id,
                backendQuality: 85,
                databaseQuality: 90,
                frontendQuality: 88,
                functionality: 92,
                stability: 85,
                usability: 87,
                total: 87.8,
                comment: 'Відмінна робота з чистим кодом та гарним дизайном'
            }
        }),
        prisma.score.create({
            data: {
                assignmentId: assignments[1].id,
                backendQuality: 90,
                databaseQuality: 85,
                frontendQuality: 85,
                functionality: 88,
                stability: 90,
                usability: 85,
                total: 87.2,
                comment: 'Solid технічне виконання, можна покращити UX'
            }
        }),
        // Scores for submission 2
        prisma.score.create({
            data: {
                assignmentId: assignments[2].id,
                backendQuality: 80,
                databaseQuality: 85,
                frontendQuality: 92,
                functionality: 85,
                stability: 88,
                usability: 95,
                total: 87.5,
                comment: 'Прекрасний дизайн та користувацький досвід'
            }
        }),
        prisma.score.create({
            data: {
                assignmentId: assignments[3].id,
                backendQuality: 85,
                databaseQuality: 80,
                frontendQuality: 90,
                functionality: 82,
                stability: 85,
                usability: 88,
                total: 85.0,
                comment: 'Хороша робота, є простір для покращень в backend частині'
            }
        })
    ]);

    console.log('✅ Seeding completed!');
    console.log('📧 Admin credentials: admin@sfl.org.ua / password123');
    console.log('📧 Jury credentials: katya@sigmasoftware.com / password123');
    console.log('📧 Team credentials: captain1@example.com / password123');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });