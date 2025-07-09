import { Button } from "../ui/button";

interface ConvertButtonProps {
  onClick?: () => void;
}

const ConvertButton = ({ onClick }: ConvertButtonProps) => {
  return (
    <div className='pt-4'>
      <Button
        onClick={onClick}
        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors'
      >
        Confirm Swap
      </Button>
    </div>
  );
};

export default ConvertButton;
