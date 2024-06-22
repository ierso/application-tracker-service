import 'dotenv/config'

import * as schema from './schema'

import { applications, users } from './schema'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

// Types
type NewUser = typeof users.$inferInsert
type NewApplication = typeof applications.$inferInsert

// Database setup
const pool = new Pool({
  connectionString: process.env.DB_URL,
})

const db = drizzle(pool, { schema })

async function clearDatabase() {
  await Promise.all([
    db.delete(schema.users),
    db.delete(schema.applications),
    db.delete(schema.activeApplications),
    db.delete(schema.pendingApplications),
    db.delete(schema.archiveApplications),
  ])
}

async function insertUser(): Promise<{ id: number }> {
  const newUser: NewUser = { name: 'Cory', email: 'test@email.com' }
  const [user] = await db
    .insert(users)
    .values(newUser)
    .returning({ id: users.id })
  return user
}

async function insertApplication(userId: number) {
  const application: NewApplication = {
    userId,
    salary: 1000,
    jobTitle: 'Frontend',
    jobLink: 'https://www.test.com',
    companyName: 'Apple',
    heardBack: false,
    numberOfInterviews: 0,
    goodMatch: true,
    additionalInfo: '',
    fileAttachment: '',
  }

  return db.insert(applications).values(application).returning()
}

async function seedDB() {
  try {
    await clearDatabase()

    const generatedUser = await insertUser()
    await insertApplication(generatedUser.id)

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await pool.end()
  }
}

seedDB()
