CREATE TABLE IF NOT EXISTS "activeApplications" (
	"id" serial PRIMARY KEY NOT NULL,
	"applicationId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" serial NOT NULL,
	"dateApplied" date,
	"salary" integer,
	"jobTitle" text NOT NULL,
	"jobLink" text NOT NULL,
	"companyName" text NOT NULL,
	"heardBack" boolean,
	"numberOfInterviews" integer,
	"goodMatch" boolean NOT NULL,
	"additionalInfo" text,
	"fileAttachment" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "archiveApplications" (
	"id" serial PRIMARY KEY NOT NULL,
	"applicationId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pendingApplications" (
	"id" serial PRIMARY KEY NOT NULL,
	"applicationId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activeApplications" ADD CONSTRAINT "activeApplications_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "archiveApplications" ADD CONSTRAINT "archiveApplications_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pendingApplications" ADD CONSTRAINT "pendingApplications_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
