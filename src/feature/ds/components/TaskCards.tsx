import { TaskCard } from "@/shared/components/ui/TaskCard";
import React from "react";

const TaskCards = () => {
  return (
    <div>
      <h5 className="font-bold text-4xl mb-4">Task Card</h5>
      <div className="border-red-300 w-[820px] border-1 p-4 flex justify-center">
        <div className="p-4">
          <TaskCard
            taskName="Nama Tugas"
            deadline="Deadline: 25 Sep 2025 • 23.59"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCards;
