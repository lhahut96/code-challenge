import { useCallback, useEffect, useState } from "react";
import ConvertButton from "./ConvertButton";
import CurrencyConverter from "./CurrencyConverter";
import CurrencyInput from "./CurrencyInput";
import SwapButton from "./SwapButton";

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

  const swapCurrencies = () => {
    const tempCurrency = sendCurrency;
    const tempAmount = sendAmount;
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(tempCurrency);
    setSendAmount(receiveAmount);
    setReceiveAmount(tempAmount);
  };

  return (
    <CurrencyConverter>
      <CurrencyInput
        label='From'
        value={sendAmount}
        onChange={handleSendAmountChange}
        selectedCurrency={sendCurrency}
        onCurrencyChange={handleSendCurrencyChange}
        currencyData={currencyData}
        placeholder='1'
        id='sendAmount'
      />

      <SwapButton onSwap={swapCurrencies} />

      <CurrencyInput
        label='To'
        value={receiveAmount}
        onChange={handleReceiveAmountChange}
        selectedCurrency={receiveCurrency}
        onCurrencyChange={handleReceiveCurrencyChange}
        currencyData={currencyData}
        placeholder='0'
        id='receiveAmount'
      />

      <ConvertButton />
    </CurrencyConverter>
  );
};

export default Home;
