import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.API_AI_ML;
    const { type, amount, role, techstack } = await req.json();

    const result = await fetch("https://api.aimlapi.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            content: `prepar questions for a job interview .
 the job role is ${role}.
 the job experience level is senior .
 the tech stack use in the job is ${techstack} .
 the focuce between behavioural and technical questions should lean towards :${type}.
 the amount of questions ${amount}.
 please return only the questions , without any additional text .
 the questions are going to be in english read by a voice assistant so do not use "/" or "*" or any special characters wich might break the voice assistant
 return the questins formatted like this :["Question 1","Question 2","Question 3"]

 thank you ! <3`,
            role: "user", // <== هذا مهم أيضاً ويبدو أنه ناقص
          },
        ],
        max_tokens: 512,
        stream: false,
      }),
    });
    const data = await result.json();
    await sql`
      INSERT INTO interview (
        role, amount, techstack, type, questions,level, createdAt
      ) VALUES
        (
          ${role},
          ${amount},
          ${techstack},
          ${type},
          ${data.choices[0].message.content},
          'senior',
          ${new Date()}
        )`;
    revalidatePath("/");
    redirect("/");
  } catch (err) {
    console.error("Error in API Route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function GET() {
  try {
    const data = await sql.unsafe(`SELECT * FROM interview`);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// { "type":"mixed", "amount":"8", "role":"frontend", "techstack":"react js" }
// export async function POST(req: Request) {
//   const { type, amount, role, techstack } = await req.json();
//   const { text: questins } = await generateText({
//     model: google("gemini-1.5-flash"),
//     prompt: `prepar questions for a job interview .
// the job role is ${role}.
// the job experience level is senior .
// the tech stack use in the job is ${techstack} .
// the focuce between behavioural and technical questions should lean towards :${type}.
// the amount of questions ${amount}.
// please return only the questions , without any additional text .
// the questions are going to be in ARBIC and  read by a voice assistant so do not use "/" or "*" or any special characters wich might break the voice assistant
// return the questins formatted like this :["Question 1","Question 2","Question 3"]

// thank you ! <3`,
//   });

//   await sql`
//       INSERT INTO interview (
//         role, amount, techstack, type, questions, createdAt
//       ) VALUES
//         (
//           ${role},
//           ${amount},
//           ${techstack},
//           ${type},
//           ${questins},
//           ${new Date()}
//         )`;

//   return Response.json({ success: true }, { status: 200 });
// }
// export async function POST(req: Response) {
//   const ai = new GoogleGenAI({
//     apiKey: "AIzaSyDEDBERdbHqGKJoyUmrPQ0BolfKwgCvfFE",
//   });

//   const response = await ai.models.generateContent({
//     model: "gemini-1.5-flash",
//     contents: "you can give me examp about sdk gemini ",
//   });
//   console.log(response.text);
//   return new Response(JSON.stringify(response), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }

// fetch api gemin and ai/ml
// export async function POST(req: Request) {
//   try {
//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBskhDoV9Zsqlxj0NMdCtCtZWHVR6RLOnA",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [{ text: "hello" }],
//               role: "user",
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Error in API Route:", err);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

////////////////////////////////////////

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     const response = await fetch("https://api.aimlapi.com/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer 280206cb25e54346b4337a8a05f856d6`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-4o",
//         messages: messages,
//         max_tokens: 512,
//         stream: true, // تمكين البث (streaming)
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("فشل في جلب البيانات من AIMLAPI");
//     }

//     const reader = response.body?.getReader();
//     const decoder = new TextDecoder();
//     let result = "";

//     // قراءة البث في قطع (chunks)
//     while (true) {
//       const { done, value } = (await reader?.read()) || {};
//       if (done) break;

//       const chunk = decoder.decode(value, { stream: true });

//       // تقسيم القطعة إلى أجزاء باستخدام 'data:' ومعالجة كل جزء على حدة
//       const dataChunks = chunk.split("\ndata:");
//       dataChunks.forEach((dataChunk) => {
//         if (dataChunk.trim()) {
//           try {
//             const parsedData = JSON.parse(dataChunk);
//             // إضافة المحتوى ذي الصلة إلى النتيجة
//             if (parsedData.choices && parsedData.choices[0]?.delta?.content) {
//               result += parsedData.choices[0].delta.content;
//             }
//           } catch (err) {
//             console.error("خطأ في تحليل القطعة:", err);
//           }
//         }
//       });
//     }

//     // بعد انتهاء البث، يتم إرجاع النتيجة
//     return NextResponse.json({ text: result }); // إرسال النتيجة المجمعة كـ JSON
//   } catch (error) {
//     console.error("خطأ في مسار API:", error);
//     return new NextResponse(
//       JSON.stringify({ error: "خطأ في الخادم الداخلي" }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }
