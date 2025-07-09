import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

interface SwapButtonProps {
  onSwap: () => void;
}

const SwapButton = ({ onSwap }: SwapButtonProps) => {
  return (
    <div className="flex justify-center py-2">
      <Button
        onClick={onSwap}
        variant="outline"
        size="sm"
        className="rounded-full p-3 hover:bg-gray-100 transition-colors border-2 border-gray-200 hover:border-gray-300"
      >
        <ArrowUpDown className="h-4 w-4 text-gray-600" />
      </Button>
    </div>
  );
};

export default SwapButton;