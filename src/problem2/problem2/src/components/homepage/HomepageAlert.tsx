import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";

export function HomepageAlert() {
  return (
    <div className='flex items-center justify-center mb-4 w-fit mx-auto'>
      <Alert>
        <AlertCircleIcon />
        <AlertTitle>
          All the prices are formatted to 2 decimal points for better
          readability.
        </AlertTitle>
      </Alert>
    </div>
  );
}
