import type { ReactNode } from "react";

interface CurrencyConverterProps {
  children: ReactNode;
}

const CurrencyConverter = ({ children }: CurrencyConverterProps) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
          Currency Converter
        </h1>
        <div className='space-y-4'>{children}</div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
