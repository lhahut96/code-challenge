import { memo, useCallback } from "react";
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
  const handleValueChange = useCallback(
    (value: string) => {
      const selectedCurrency =
        currencyData.find((currency) => currency.currency === value) ?? null;
      onChange(selectedCurrency);
    },
    [currencyData, onChange]
  );

  const getLogoUrl = useCallback((currency: string) => {
    return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
  }, []);

  return (
    <Select value={selected?.currency || ""} onValueChange={handleValueChange}>
      <SelectTrigger
        className={`${className} border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md`}
      >
        <div className='flex items-center space-x-2'>
          <SelectValue
            placeholder='Select currency'
            className='text-gray-700'
          />
        </div>
      </SelectTrigger>
      <SelectContent>
        {currencyData.map((currency) => {
          return (
            <SelectItem key={currency.currency} value={currency.currency}>
              <div className='flex items-center space-x-2'>
                <img
                  src={getLogoUrl(currency.currency)}
                  alt={`${currency.currency} logo`}
                  className='w-4 h-4 rounded-full'
                  onError={(e) => {
                    e.currentTarget.src = getLogoUrl("USD");
                  }}
                />
                <span>{currency.currency}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default memo(SelectCurrency);
