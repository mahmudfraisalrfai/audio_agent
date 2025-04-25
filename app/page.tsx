import AudioAgent from "@/app/components/agent_audio";
import { getUserById } from "./lib/actions/actions";
import InterviewCard from "./components/card";
export default async function Chat() {
  const data = await getUserById();

  return (
    <>
      <AudioAgent />

      <InterviewCard interview={data} />
    </>
  );
}
