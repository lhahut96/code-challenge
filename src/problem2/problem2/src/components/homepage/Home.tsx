import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SelectCurrency from "./SelectCurrency";

export interface CurrencyData {
  currency: string;
  price: number;
  date: string;
}

const Home = ({ currencyData }: { currencyData: CurrencyData[] }) => {
  const [sendCurrency, setSendCurrency] = useState<CurrencyData | null>(null);
  const [receiveCurrency, setReceiveCurrency] = useState<CurrencyData | null>(
    null
  );
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);

  const handleSendCurrencyChange = useCallback(
    (currency: CurrencyData | null) => {
      setSendCurrency(currency);
    },
    []
  );

  const handleReceiveCurrencyChange = useCallback(
    (currency: CurrencyData | null) => {
      setReceiveCurrency(currency);
    },
    []
  );

  const handleSendAmountChange = useCallback(
    (amount: number) => {
      setSendAmount(amount);
      if (sendCurrency) {
        const receivePrice = currencyData.find(
          (currency) => currency.currency === receiveCurrency?.currency
        )?.price;
        if (receivePrice) {
          setReceiveAmount((amount * sendCurrency.price) / receivePrice);
        }
      }
    },
    [sendCurrency, receiveCurrency, currencyData]
  );

  const handleReceiveAmountChange = useCallback(
    (amount: number) => {
      setReceiveAmount(amount);
      if (receiveCurrency) {
        const sendPrice = currencyData.find(
          (currency) => currency.currency === sendCurrency?.currency
        )?.price;
        if (sendPrice) {
          setSendAmount((amount * receiveCurrency.price) / sendPrice);
        }
      }
    },
    [receiveCurrency, sendCurrency, currencyData]
  );

  useEffect(() => {
    if (sendCurrency && receiveCurrency) {
      handleSendAmountChange(sendAmount);
    }
  }, [sendCurrency, receiveCurrency, handleSendAmountChange, sendAmount]);

  return (
    <>
      <h1>Swap</h1>
      <div className='flex max-w-[80%] items-center justify-between gap-4'>
        <label className='text-nowrap' htmlFor='sendAmount'>
          Amount to send
        </label>

        <Input
          id='sendAmount'
          value={sendAmount}
          onChange={(e) => handleSendAmountChange(Number(e.target.value))}
          type='number'
        />
        <SelectCurrency
          selected={sendCurrency}
          onChange={handleSendCurrencyChange}
          currencyData={currencyData}
          className='w-[500px] justify-around'
        />
        <label className='text-nowrap' htmlFor='receiveAmount'>
          Amount to receive
        </label>
        <Input
          id='receiveAmount'
          value={receiveAmount}
          onChange={(e) => handleReceiveAmountChange(Number(e.target.value))}
          type='number'
        />
        <SelectCurrency
          selected={receiveCurrency}
          onChange={handleReceiveCurrencyChange}
          currencyData={currencyData}
          className='w-[500px] justify-around'
        />
        <Button className='w-24'>Swap</Button>
      </div>
    </>
  );
};

export default Home;
