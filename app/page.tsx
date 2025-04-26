import AudioAgent from "@/app/components/agent_audio";
import { getUserById } from "./lib/actions/actions";
import InterviewCard from "./components/card";
import { Suspense } from "react";
import InterviewCardSkeleton from "./components/skeletoneInterview";
export default async function Chat() {
  const data = await getUserById();

  return (
    <>
      <AudioAgent />
      <Suspense fallback={<InterviewCardSkeleton />}>
        <InterviewCard interview={data} />
      </Suspense>
    </>
  );
}
