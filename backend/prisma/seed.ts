import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Role } from '../lib/db'




const prisma = new PrismaClient()

async function main() {
    // 1. Create a Mentor
    const mentor = await prisma.user.upsert({
        where: { email: 'mentor@school.com' },
        update: {},
        create: {
            email: 'mentor@school.com',
            name: 'Mr. Stark',
            password: 'hashed_password_123', // In real app, hash this!
            role: Role.MENTOR,
        },
    })

    // 2. Create a Student
    const student = await prisma.user.upsert({
        where: { email: 'student@school.com' },
        update: {},
        create: {
            email: 'student@school.com',
            name: 'Peter Parker',
            password: 'hashed_password_456',
            role: Role.STUDENT,
        },
    })

    console.log({ mentor, student })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
