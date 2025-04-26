"use client";

import { motion } from "framer-motion";

export default function InterviewCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mx-auto mb-6 space-y-4 animate-pulse"
    >
      {/* Header skeleton */}
      <div className="flex justify-between text-sm text-gray-300">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </div>

      {/* Main info skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-48 bg-gray-300 rounded"></div>
        <div className="h-4 w-40 bg-gray-300 rounded"></div>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
        <div className="h-4 w-36 bg-gray-300 rounded"></div>
      </div>

      {/* Questions list skeleton */}
      <div className="pt-4 border-t border-gray-200">
        <div className="h-5 w-28 bg-gray-300 rounded mb-2"></div>
        <ul className="space-y-2">
          {[...Array(3)].map((_, idx) => (
            <li key={idx} className="h-4 w-64 bg-gray-300 rounded"></li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
