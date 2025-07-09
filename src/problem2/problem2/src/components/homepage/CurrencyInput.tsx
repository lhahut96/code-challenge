import { Input } from "../ui/input";
import type { CurrencyData } from "./Home";
import SelectCurrency from "./SelectCurrency";

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  selectedCurrency: CurrencyData | null;
  onCurrencyChange: (currency: CurrencyData | null) => void;
  currencyData: CurrencyData[];
  placeholder?: string;
  id: string;
}

const CurrencyInput = ({
  label,
  value,
  onChange,
  selectedCurrency,
  onCurrencyChange,
  currencyData,
  placeholder = "0",
  id,
}: CurrencyInputProps) => {
  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700' htmlFor={id}>
        {label}
      </label>
      <div className='flex items-center space-x-2'>
        <div className='flex-1'>
          <Input
            id={id}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            type='number'
            placeholder={placeholder}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
        <SelectCurrency
          selected={selectedCurrency}
          onChange={onCurrencyChange}
          currencyData={currencyData}
          className='w-40'
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
