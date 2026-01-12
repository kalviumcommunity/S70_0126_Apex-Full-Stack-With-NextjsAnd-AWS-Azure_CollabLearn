"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    // 1. Create a Mentor
    const mentor = await prisma.user.upsert({
        where: { email: 'mentor@school.com' },
        update: {},
        create: {
            email: 'mentor@school.com',
            name: 'Mr. Stark',
            password: 'hashed_password_123', // In real app, hash this!
            role: client_1.Role.MENTOR,
        },
    });
    // 2. Create a Student
    const student = await prisma.user.upsert({
        where: { email: 'student@school.com' },
        update: {},
        create: {
            email: 'student@school.com',
            name: 'Peter Parker',
            password: 'hashed_password_456',
            role: client_1.Role.STUDENT,
        },
    });
    console.log({ mentor, student });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
