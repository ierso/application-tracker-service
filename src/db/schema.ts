import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
})

export const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  userId: serial('userId')
    .references(() => users.id)
    .notNull(),
  dateApplied: date('dateApplied'),
  salary: integer('salary'),
  jobTitle: text('jobTitle').notNull(),
  jobLink: text('jobLink').notNull(),
  companyName: text('companyName').notNull(),
  heardBack: boolean('heardBack'),
  numberOfInterviews: integer('numberOfInterviews'),
  goodMatch: boolean('goodMatch').notNull(),
  additionalInfo: text('additionalInfo'),
  fileAttachment: text('fileAttachment'),
})

export const activeApplications = pgTable('activeApplications', {
  id: serial('id').primaryKey(),
  applicationId: serial('applicationId')
    .references(() => applications.id)
    .notNull(),
})

export const pendingApplications = pgTable('pendingApplications', {
  id: serial('id').primaryKey(),
  applicationId: serial('applicationId')
    .references(() => applications.id)
    .notNull(),
})

export const archiveApplications = pgTable('archiveApplications', {
  id: serial('id').primaryKey(),
  applicationId: serial('applicationId')
    .references(() => applications.id)
    .notNull(),
})
