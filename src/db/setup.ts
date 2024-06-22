import 'dotenv/config'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

export const client = new Client({
  connectionString: process.env.DB_URL,
})

async function connectClient() {
  try {
    console.log(`connecting to client...`)
    await client.connect()
  } catch (error) {
    console.log(`client connection error: `, error)
  }
}

connectClient()

export const db = drizzle(client)
