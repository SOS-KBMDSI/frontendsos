import { Input } from "@/shared/components/ui/Input";
import { Search, Eye } from "lucide-react";

export default function Inputs() {
  return (
    <div className="h-full">
      <h5 className="font-bold text-4xl">Input Fields</h5>
      <div className="space-y-8 border border-red-300 w-1/2 p-4 mt-4">
        {/* Default State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Title" placeholder="Input Value" status="Status" />
          <Input
            label="Title"
            placeholder="Input Value"
            status="Status"
            variant="error"
          />
        </div>

        {/* Hover State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Title"
            placeholder="Input Value"
            status="Status"
            state="hover"
          />
          <Input
            label="Title"
            placeholder="Input Value"
            status="Status"
            variant="success"
          />
        </div>

        {/* Pressed/Focus State */}
        <Input
          label="Title"
          placeholder="Input Value"
          status="Status"
          state="pressed"
        />

        {/* Disabled State */}
        <Input
          label="Title"
          placeholder="Input Value"
          status="Status"
          disabled
        />

        {/* With Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Search"
            placeholder="Search..."
            leftIcon={<Search className="w-4 h-4" />}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            rightIcon={<Eye className="w-4 h-4" />}
          />
        </div>

        {/* Different Sizes */}
        <div className="space-y-4">
          <Input label="Small Input" placeholder="Small size" size="small" />
          <Input
            label="Default Input"
            placeholder="Default size"
            size="default"
          />
          <Input label="Large Input" placeholder="Large size" size="large" />
        </div>
      </div>
    </div>
  );
}
