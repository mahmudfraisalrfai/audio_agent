import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedInterview() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS interview (
      userid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      role TEXT NOT NULL,
      level TEXT NOT NULL,
      amount TEXT NOT NULL ,
      techstack TEXT NOT NULL ,
      type TEXT NOT NULL,
      questions TEXT NOT NULL,
      createdAt TIMESTAMP NOT NULL
    );
  `;
}
export async function GET() {
  try {
    await seedInterview();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding DB:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
