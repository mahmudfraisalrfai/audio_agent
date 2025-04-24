import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getUserById(): Promise<information> {
  const data =
    await sql<any>`SELECT * FROM interview ORDER BY createdat DESC LIMIT 1`;

  const item = data[0];

  return {
    ...item,
  };
}
