import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

interface SwapButtonProps {
  onSwap: () => void;
}

const SwapButton = ({ onSwap }: SwapButtonProps) => {
  return (
    <div className="flex justify-center">
      <Button
        onClick={onSwap}
        variant="outline"
        size="sm"
        className="rounded-full p-2 hover:bg-gray-100 transition-colors"
      >
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SwapButton;