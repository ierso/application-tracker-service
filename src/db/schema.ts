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
  name: text('name').notNull(),
  email: text('email').notNull(),
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

// // Function to get categorized applications for a specific user
// async function getCategorizedApplicationsByUser(userId: string) {
//   // Get all applications for the user
//   const userApplications = await db.select()
//     .from(applications)
//     .where(eq(applications.userId, userId));

//   // Extract application IDs for further categorization
//   const applicationIds = userApplications.map(app => app.id);

//   // Get active applications
//   const activeApps = await db.select()
//     .from(activeApplications)
//     .where(inArray(activeApplications.applicationId, applicationIds));

//   // Get pending applications
//   const pendingApps = await db.select()
//     .from(pendingApplications)
//     .where(inArray(pendingApplications.applicationId, applicationIds));

//   // Get archived applications
//   const archivedApps = await db.select()
//     .from(archiveApplications)
//     .where(inArray(archiveApplications.applicationId, applicationIds));

//   // Categorize applications
//   const categorizedApplications = {
//     active: activeApps.map(active => userApplications.find(app => app.id === active.applicationId)),
//     pending: pendingApps.map(pending => userApplications.find(app => app.id === pending.applicationId)),
//     archived: archivedApps.map(archived => userApplications.find(app => app.id === archived.applicationId)),
//   };

//   return categorizedApplications;
// }

// // Example usage
// const userId = 'some-user-id'; // Replace with the actual user ID
// getCategorizedApplicationsByUser(userId).then(categorizedApplications => {
//   console.log('Categorized applications for user:', categorizedApplications);
// });
