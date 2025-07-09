import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { CurrencyData } from "../components/homepage/Home";
import { validateSwap } from "../utils/validation";

interface UseCurrencySwapProps {
  sendCurrency: CurrencyData | null;
  receiveCurrency: CurrencyData | null;
  sendAmount: number;
  receiveAmount: number;
}

export const useCurrencySwap = ({
  sendCurrency,
  receiveCurrency,
  sendAmount,
  receiveAmount,
}: UseCurrencySwapProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const executeSwap = useCallback(async (): Promise<void> => {
    const validation = validateSwap(
      sendCurrency,
      receiveCurrency,
      sendAmount,
      receiveAmount
    );

    if (!validation.isValid) {
      toast.error(validation.message, {
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        `Swap confirmed: ${sendAmount} ${
          sendCurrency?.currency
        } → ${receiveAmount.toFixed(4)} ${receiveCurrency?.currency}`,
        {
          position: "top-center",
          duration: 4000,
        }
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Swap failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  }, [sendCurrency, receiveCurrency, sendAmount, receiveAmount]);

  return {
    isLoading,
    executeSwap,
  };
};
