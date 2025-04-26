import { AlertTriangle } from "lucide-react";

interface ErrorAlertProps {
  type?: string;
  message: string;
}

const ErrorAlert = ({ type = "Error", message }: ErrorAlertProps) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-start gap-2 max-w-md mx-auto shadow-md mt-4">
      <AlertTriangle className="w-5 h-5 mt-1 text-red-500" />
      <div>
        <strong className="font-semibold">{type}: </strong>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorAlert;
