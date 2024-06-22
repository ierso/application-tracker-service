// import { drizzle, eq } from 'drizzle-orm';
// import { sqlite } from 'drizzle-orm/sqlite';

// // Assuming db, users, and applications are already defined as shown previously

// // Function to get all applications for a specific user
// async function getApplicationsByUser(userId: string) {
//   const applicationsForUser = await db.select()
//     .from(applications)
//     .where(eq(applications.userId, userId));

//   return applicationsForUser;
// }

// // Example usage
// const userId = 'some-user-id'; // Replace with the actual user ID
// getApplicationsByUser(userId).then(applications => {
//   console.log('Applications for user:', applications);
// });



// import { drizzle, eq } from 'drizzle-orm';
// import { sqlite } from 'drizzle-orm/sqlite';

// // Assuming db, users, applications, activeApplications, pendingApplications, and archiveApplications are already defined as shown previously

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
