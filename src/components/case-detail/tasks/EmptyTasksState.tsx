
import React from "react";
import { PartyPopper } from "lucide-react";

export const EmptyTasksState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-auto bg-gray-100 rounded-md py-3 text-gray-400">
      <PartyPopper className="h-6 w-6 text-gray-600 mb-2" />
      <p className="text-sm text-gray-600 text-center">You don't have any more upcoming tasks</p>
    </div>
  );
};
