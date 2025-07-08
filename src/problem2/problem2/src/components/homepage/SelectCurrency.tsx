import { memo, useCallback, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { CurrencyData } from "./Home";

interface SelectCurrencyProps {
  selected: CurrencyData | null;
  onChange: (currency: CurrencyData | null) => void;
  currencyData: CurrencyData[];
  className?: string;
}

const SelectCurrency = ({
  selected,
  onChange,
  currencyData,
  className = "",
}: SelectCurrencyProps) => {
  const currencyLogoUrl = useMemo(() => {
    return selected
      ? `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${selected.currency}.svg`
      : "";
  }, [selected]);

  const handleValueChange = useCallback(
    (value: string) => {
      const selectedCurrency =
        currencyData.find((currency) => currency.currency === value) ?? null;
      onChange(selectedCurrency);
    },
    [currencyData, onChange]
  );

  return (
    <Select value={selected?.currency || ""} onValueChange={handleValueChange}>
      <SelectTrigger className={`w-[180px] ${className}`}>
        <SelectValue placeholder='Currency' />
        {currencyLogoUrl && (
          <img
            src={currencyLogoUrl}
            alt={selected?.currency || "Currency logo"}
            className='w-4 h-4 mr-2'
          />
        )}
      </SelectTrigger>
      <SelectContent>
        {currencyData.map((currency) => (
          <SelectItem key={currency.currency} value={currency.currency}>
            {currency.currency}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default memo(SelectCurrency);
