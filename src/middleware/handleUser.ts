import { NextFunction, Request, Response } from 'express'

import { eq } from 'drizzle-orm'
import { AuthResult } from 'express-oauth2-jwt-bearer'
import { users } from '../db/schema'
import { db } from '../db/setup'

type Auth0User = {
  sub: string
  name?: string
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthResult
      user?: unknown
    }
  }
}

const getExistingUser = async (auth0Id: string) => {
  console.log('getExistingUser, auth0Id', auth0Id)

  const existingUsers = await db
    .select()
    .from(users)
    .where(eq(users.id, parseInt(auth0Id)))
    .limit(1)
  return existingUsers[0]
}

const createUser = async (auth0User: Auth0User) => {
  console.log('create user')

  const [newUser] = await db
    .insert(users)
    .values({
      id: parseInt(auth0User.sub),
      name: auth0User.name || null,
    })
    .returning()
  return newUser
}

const updateUser = async (auth0User: Auth0User) => {
  const [updatedUser] = await db
    .update(users)
    .set({
      name: auth0User.name || null,
    })
    .where(eq(users.id, parseInt(auth0User.sub)))
    .returning()
  return updatedUser
}

export const handleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.auth?.payload) {
    return next()
  }

  const auth0User = req.auth.payload as Auth0User

  console.log('before try', auth0User)

  try {
    let user = await getExistingUser(auth0User.sub as string)

    if (!user) {
      user = await createUser(auth0User)
    } else {
      user = await updateUser(auth0User)
    }

    console.log('log user: ', user)

    req.user = user
    next()
  } catch (error) {
    console.error('Error handling user:', error)
    next(error)
  }
}
