import { useEffect, useState } from "react";
import "./App.css";
import SelectCurrency from "./components/homepage/SelectCurrency";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

export interface CurrencyData {
  currency: string;
  price: number;
  date: string;
}

function App() {
  const [currencyData, setCurrencyData] = useState<CurrencyData[]>([]);
  const [sendCurrency, setSendCurrency] = useState<CurrencyData | null>(null);
  const [receiveCurrency, setReceiveCurrency] = useState<CurrencyData | null>(
    null
  );
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const setCurrencies = new Set<string>();
        const formattedData: CurrencyData[] = data
          .map((item: CurrencyData) => {
            if (!setCurrencies.has(item.currency)) {
              setCurrencies.add(item.currency);
              return {
                currency: item.currency,
                price: item.price,
                date: item.date,
              };
            } else {
              return null; // Skip duplicates
            }
          })
          .filter((item: CurrencyData | null) => item !== null);
        setCurrencyData(formattedData);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencyData();
  }, []);

  const handleSendAmountChange = (amount: number) => {
    setSendAmount(amount);
    if (sendCurrency) {
      const receivePrice = currencyData.find(
        (currency) => currency.currency === receiveCurrency?.currency
      )?.price;
      if (receivePrice) {
        setReceiveAmount((amount * sendCurrency.price) / receivePrice);
      }
    }
  };

  const handleReceiveAmountChange = (amount: number) => {
    setReceiveAmount(amount);
    if (receiveCurrency) {
      const sendPrice = currencyData.find(
        (currency) => currency.currency === sendCurrency?.currency
      )?.price;
      if (sendPrice) {
        setSendAmount((amount * receiveCurrency.price) / sendPrice);
      }
    }
  };

  return (
    <>
      <h1>Swap</h1>
      <div className='flex max-w-[80%] items-center justify-between gap-4'>
        <label className='text-nowrap' htmlFor='sendAmount'>
          Amount to send
        </label>

        <Input></Input>
        <Input
          id='sendAmount'
          value={sendAmount}
          onChange={(e) => handleSendAmountChange(Number(e.target.value))}
          type='number'
        />
        <SelectCurrency
          selected={sendCurrency}
          onChange={setSendCurrency}
          currencyData={currencyData}
          className='w-[350px]'
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
          onChange={setReceiveCurrency}
          currencyData={currencyData}
          className='w-[350px]'
        />
        <Button className='w-24'>Swap</Button>
      </div>
    </>
  );
}

export default App;
