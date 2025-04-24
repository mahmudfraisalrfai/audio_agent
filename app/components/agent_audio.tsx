// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// import { vapi } from "@/app/lib/vapi.sdk";
// // import { interviewer } from "@/constants";
// // import { createFeedback } from "@/lib/actions/general.action";

// enum CallStatus {
//   INACTIVE = "INACTIVE",
//   CONNECTING = "CONNECTING",
//   ACTIVE = "ACTIVE",
//   FINISHED = "FINISHED",
// }

// interface SavedMessage {
//   role: "user" | "system" | "assistant";
//   content: string;
// }

// const Agent = () => {
//   const router = useRouter();
//   const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
//   const [messages, setMessages] = useState<SavedMessage[]>([]);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [lastMessage, setLastMessage] = useState<string>("");

//   useEffect(() => {
//     const onCallStart = () => {
//       setCallStatus(CallStatus.ACTIVE);
//     };

//     const onCallEnd = () => {
//       setCallStatus(CallStatus.FINISHED);
//     };

//     const onMessage = (message: Message) => {
//       if (message.type === "transcript" && message.transcriptType === "final") {
//         const newMessage = { role: message.role, content: message.transcript };
//         setMessages((prev) => [...prev, newMessage]);
//       }
//     };

//     const onSpeechStart = () => {
//       console.log("speech start");
//       setIsSpeaking(true);
//     };

//     const onSpeechEnd = () => {
//       console.log("speech end");
//       setIsSpeaking(false);
//     };

//     const onError = (error: Error) => {
//       console.log("Error:", error);
//     };

//     vapi.on("call-start", onCallStart);
//     vapi.on("call-end", onCallEnd);
//     vapi.on("message", onMessage);
//     vapi.on("speech-start", onSpeechStart);
//     vapi.on("speech-end", onSpeechEnd);
//     vapi.on("error", onError);

//     return () => {
//       vapi.off("call-start", onCallStart);
//       vapi.off("call-end", onCallEnd);
//       vapi.off("message", onMessage);
//       vapi.off("speech-start", onSpeechStart);
//       vapi.off("speech-end", onSpeechEnd);
//       vapi.off("error", onError);
//     };
//   }, []);

//   // useEffect(() => {
//   //   if (messages.length > 0) {
//   //     setLastMessage(messages[messages.length - 1].content);
//   //   }

//   //   const handleGenerateFeedback = async (messages: SavedMessage[]) => {
//   //     console.log("handleGenerateFeedback");

//   //     // const { success, feedbackId: id } = await createFeedback({
//   //     //   interviewId: interviewId!,
//   //     //   userId: userId!,
//   //     //   transcript: messages,
//   //     //   feedbackId,
//   //     // });

//   //   //   if (success && id) {
//   //   //     router.push(`/interview/${interviewId}/feedback`);
//   //   //   } else {
//   //   //     console.log("Error saving feedback");
//   //   //     router.push("/");
//   //   //   }
//   //   // };

//   //   if (callStatus === CallStatus.FINISHED) {
//   //     if (type === "generate") {
//   //       router.push("/");
//   //     } else {
//   //       handleGenerateFeedback(messages);
//   //     }
//   //   }
//   // }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

//   const handleCall = async () => {
//     setCallStatus(CallStatus.CONNECTING);

//     if (type === "generate") {
//       await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
//         variableValues: {
//           username: userName,
//           userid: userId,
//         },
//       });
//     } else {
//       let formattedQuestions = "";
//       if (questions) {
//         formattedQuestions = questions
//           .map((question) => `- ${question}`)
//           .join("\n");
//       }

//       await vapi.start(interviewer, {
//         variableValues: {
//           questions: formattedQuestions,
//         },
//       });
//     }
//   };

//   const handleDisconnect = () => {
//     setCallStatus(CallStatus.FINISHED);
//     vapi.stop();
//   };

//   return (
//     <>
//       <div className="call-view">
//         {/* AI Interviewer Card */}
//         <div className="card-interviewer">
//           <div className="avatar">
//             <Image
//               src="/ai-avatar.png"
//               alt="profile-image"
//               width={65}
//               height={54}
//               className="object-cover"
//             />
//             {isSpeaking && <span className="animate-speak" />}
//           </div>
//           <h3>AI Interviewer</h3>
//         </div>

//         {/* User Profile Card */}
//         <div className="card-border">
//           <div className="card-content">
//             <Image
//               src="/user-avatar.png"
//               alt="profile-image"
//               width={539}
//               height={539}
//               className="rounded-full object-cover size-[120px]"
//             />
//             <h3>mahmoud</h3>
//           </div>
//         </div>
//       </div>

//       {messages.length > 0 && (
//         <div className="transcript-border">
//           <div className="transcript">
//             <p
//               key={lastMessage}
//               className=
//                 "transition-opacity duration-500 opacity-0 animate-fadeIn opacity-100"
//               )
//             >
//               {lastMessage}
//             </p>
//           </div>
//         </div>
//       )}

//       <div className="w-full flex justify-center">
//         {callStatus !== "ACTIVE" ? (
//           <button className="relative btn-call" onClick={() => handleCall()}>
//             <span
//               className={cn(
//                 "absolute animate-ping rounded-full opacity-75",
//                 callStatus !== "CONNECTING" && "hidden"
//               )}
//             />

//             <span className="relative">
//               {callStatus === "INACTIVE" || callStatus === "FINISHED"
//                 ? "Call"
//                 : ". . ."}
//             </span>
//           </button>
//         ) : (
//           <button className="btn-disconnect" onClick={() => handleDisconnect()}>
//             End
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Agent;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { vapi } from "@/app/lib/vapi.sdk";
import { cn } from "../lib/utils/cn";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = () => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }
  }, [messages]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>mahmoud</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
// "use client";

// import { useEffect, useState, useRef } from "react";
// import { vapi } from "@/app/lib/vapi.sdk";
// import { PhoneCall, PhoneOff, Speech, Bot } from "lucide-react";
// import { Card, CardContent } from "@/app/components/ui/card";
// import { Button } from "@/app/components/ui/buuton";
// import { motion } from "framer-motion";

// // نوع الرسالة
// type Message = {
//   from: "agent" | "user";
//   text: string;
// };

// export default function AudioAgent() {
//   const [inCall, setInCall] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   // التمرير لآخر رسالة
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     vapi.on("call-start", () => setInCall(true));
//     vapi.on("call-end", () => setInCall(false));
//     vapi.on("speech-start", () => inCall && setIsSpeaking(true));
//     vapi.on("speech-end", () => inCall && setIsSpeaking(false));
//     vapi.on("message", (msg: Message) => {
//       console.log(msg);

//       setMessages((prev) => [...prev, msg]);
//     });
//   }, [inCall, isSpeaking, messages]);

//   useEffect(scrollToBottom, [messages]);

//   const toggleCall = async () => {
//     if (!inCall) {
//       await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID);
//     } else {
//       vapi.stop();
//     }
//   };

//   return (
//     <div className="flex flex-col h-full p-4 space-y-4">
//       <div className="flex justify-center">
//         <Button
//           className="flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-green-400 to-blue-500 rounded-2xl shadow-lg hover:scale-110 transform transition"
//           onClick={toggleCall}
//         >
//           {inCall ? (
//             <PhoneOff className="text-red-600 w-6 h-6" />
//           ) : (
//             <PhoneCall className="text-white w-6 h-6" />
//           )}
//         </Button>
//       </div>

//       <Card className="flex-1 overflow-y-auto">
//         <CardContent className="space-y-2">
//           {messages.map((msg, idx) => (
//             <div key={idx}>{idx === messages.length - 1 ? msg.text : null}</div>
//           ))}

//           {inCall && (
//             <div className="flex justify-center mt-2">
//               {isSpeaking ? (
//                 <Bot className="animate-pulse w-6 h-6 text-blue-500" />
//               ) : (
//                 <Speech className="w-6 h-6 text-gray-400" />
//               )}
//             </div>
//           )}

//           {messages.length > 0 && (
//             <div className="text-center text-sm text-gray-600 italic">
//               آخر ما قاله المساعد:{" "}
//               {[...messages].reverse().find((msg) => msg.from === "agent")
//                 ?.text ?? "لا توجد رسالة بعد"}
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
