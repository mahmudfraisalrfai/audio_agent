"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function InterviewCard({
  interview,
}: {
  interview: information;
}) {
  const [formattedDate, setFormattedDate] = useState<string>("");

  const [parsedQuestions, setParseQuestions] = useState<string[]>();
  useEffect(() => {
    setFormattedDate(interview.createdat.toUTCString());
    setParseQuestions(JSON.parse(interview.questions));
  }, [interview.createdat, interview.questions]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mx-auto mb-6 space-y-4 hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Header - تاريخ المقابلة */}
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>📅 {formattedDate}</span>
      </div>

      {/* معلومات المقابلة */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {interview.role} ({interview.level})
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          🛠️ Stack: {interview.techstack}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          🧪 Type: {interview.type}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          🔢 Questions Count: {interview.amount}
        </p>
      </div>

      {/* قسم الأسئلة */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
          📝 Questions:
        </h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          {parsedQuestions?.map((q: string, idx: number) => (
            <li
              key={idx}
              className="hover:text-blue-500 transition-colors duration-200"
            >
              {q}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
