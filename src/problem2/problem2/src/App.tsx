import { useEffect, useState } from "react";
import Home, { type CurrencyData } from "./components/homepage/Home";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  const [currencyData, setCurrencyData] = useState<CurrencyData[]>([]);

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
  return (
    <>
      <Toaster />
      <Home currencyData={currencyData} />
    </>
  );
};

export default App;
