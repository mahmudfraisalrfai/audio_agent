import { getUserById } from "@/app/lib/actions/actions";
import Card from "./card";
export default async function interviewcard() {
  const interview: information = await getUserById();

  return <Card interview={interview} />;
}
