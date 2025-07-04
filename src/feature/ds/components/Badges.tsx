import { Badge } from "@/shared/components/ui/Badge";
import React from "react";

const Badges = () => {
  return (
    <div>
      <h5 className="font-bold text-4xl mb-4">Badge Status</h5>
      <div className="border-red-300 w-[820px] border-1 p-4">
        <div className="flex items-center space-x-4 p-4">
          <Badge variant="not_started">Belum Mulai</Badge>
          <Badge variant="completed">Selesai</Badge>
          <Badge variant="overdue">Terlewat</Badge>
        </div>
      </div>
    </div>
  );
};

export default Badges;
