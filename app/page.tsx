import AudioAgent from "@/app/components/agent_audio";
export default function Chat() {
  type Message = {
    role: string;
    content: string;
  };

  const formatResponse = (response: string) => {
    // إزالة العلامات غير الضرورية
    const cleanText = response.replace(/[\{\}\[\]"!]/g, "").trim();
    // تقسيم النص إلى فقرات منفصلة بناءً على الفقرات
    const paragraphs = cleanText
      .split("\n")
      .map((p, index) => <p key={index}>{p}</p>);
    return paragraphs;
  };

  return (
    <>
      <AudioAgent />
    </>
  );
}
