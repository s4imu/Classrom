/*First run this query to create the database*/
CREATE DATABASE class;

/*Then create the required tables*/
CREATE TABLE "students" (
"id" SERIAL PRIMARY KEY,
"avatar_url" text,
"name" text,
"email" text,
"birth" timestamp NOT NULL,
"school_year" text,
"class_hours" int,
"teacher_id" int
);

CREATE TABLE "teachers" (
"id" SERIAL PRIMARY KEY,
"avatar_url" text,
"name" text,
"birth_date" timestamp,
"education_level" text,
"class_type" text,
"subjects_taught" text
);