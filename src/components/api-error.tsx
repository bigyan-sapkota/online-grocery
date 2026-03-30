import { AlertTriangle } from "lucide-react";

type ApiErrorProps = {
  message?: string;
};

export default function ApiError({ message }: ApiErrorProps) {
  return (
    <div className="flex h-96 w-full items-center justify-center rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
      <AlertTriangle className="mr-2 h-5 w-5" />
      <span className="text-sm font-medium">
        {message ?? "Something went wrong. Please try again."}
      </span>
    </div>
  );
}
