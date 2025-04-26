import AudioAgent from "@/app/components/agent_audio";
import InterviewCard from "./components/interviewcard";
import { Suspense } from "react";
import InterviewCardSkeleton from "./components/skeletoneInterview";
export default function Chat() {
  return (
    <>
      <AudioAgent />
      <Suspense fallback={<InterviewCardSkeleton />}>
        <InterviewCard />
      </Suspense>
    </>
  );
}
