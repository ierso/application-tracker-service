import { Request, Response } from 'express'
import {
  activeApplications,
  applications,
  archiveApplications,
  pendingApplications,
} from './db/schema'

import { eq } from 'drizzle-orm'
import { db } from './db/setup'

export const getCategorizedApplicationsByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = parseInt(req.params.userId)

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' })
    }

    const [activeApps, pendingApps, archivedApps] = await Promise.all([
      db
        .select()
        .from(activeApplications)
        .innerJoin(
          applications,
          eq(activeApplications.applicationId, applications.id)
        )
        .where(eq(applications.userId, userId)),
      db
        .select()
        .from(pendingApplications)
        .innerJoin(
          applications,
          eq(pendingApplications.applicationId, applications.id)
        )
        .where(eq(applications.userId, userId)),
      db
        .select()
        .from(archiveApplications)
        .innerJoin(
          applications,
          eq(archiveApplications.applicationId, applications.id)
        )
        .where(eq(applications.userId, userId)),
    ])

    const categorizedApplications = {
      active: activeApps.map(({ applications }) => applications),
      pending: pendingApps.map(({ applications }) => applications),
      archived: archivedApps.map(({ applications }) => applications),
    }

    res.json(categorizedApplications)
  } catch (error) {
    console.error('Error fetching categorized applications:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
