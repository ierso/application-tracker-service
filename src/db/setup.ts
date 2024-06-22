import 'dotenv/config'

import * as schema from './schema'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

export const pool = new Pool({
  connectionString: process.env.DB_URL,
})

async function connectClient() {
  try {
    console.log(`connecting to client...`)
    await pool.connect()
  } catch (error) {
    console.log(`client connection error: `, error)
  }
}

connectClient()

export const db = drizzle(pool, { schema })
