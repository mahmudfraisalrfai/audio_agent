import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedInterview() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // نحذف الجدول القديم إذا موجود
  await sql`DROP TABLE IF EXISTS interview`;

  // ننشئ الجدول من جديد
  await sql`
    CREATE TABLE IF NOT EXISTS interview (
      userid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      role TEXT NOT NULL,
      level TEXT NOT NULL,
      amount TEXT NOT NULL,
      techstack TEXT NOT NULL,
      type TEXT NOT NULL,
      questions TEXT NOT NULL,
      createdAt TIMESTAMP NOT NULL
    );
  `;

  // نحاول نحذف أي قيود متبقية (لو كانت موجودة قبل)
  try {
    await sql`ALTER TABLE interview DROP CONSTRAINT interview_amount_key`;
    await sql`ALTER TABLE interview DROP CONSTRAINT interview_techstack_key`;
    await sql`ALTER TABLE interview DROP CONSTRAINT interview_level_key`;
    await sql`ALTER TABLE interview DROP CONSTRAINT interview_type_key`;
    await sql`ALTER TABLE interview DROP CONSTRAINT interview_userid_key`;
    await sql`ALTER TABLE interview DROP CONSTRAINT interview_role_key`;
  } catch (error) {
    console.warn("Constraint not found, skipping DROP CONSTRAINT.");
  }
}

export async function GET() {
  try {
    await seedInterview();
    return Response.json({ message: "Database reset and seeded successfully" });
  } catch (error) {
    console.error("Error seeding DB:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
