type BlockchainTypes =
  | "Osmosis"
  | "Ethereum"
  | "Arbitrum"
  | "Zilliqa"
  | "Neo"
  | (string & {});

interface WalletBalance {
  currency: string;
  amount: number;
  // This WalletBalance is missing the blockchain property, so we will add it
  blockchain: BlockchainTypes;
}
// This interface is extended by WalletBalance to include additional properties so we should use extends
// interface FormattedWalletBalance {
//   currency: string;
//   amount: number;
//   formatted: string;
// }

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  priority: number; // Optional property for priority
}

// Should be named as PageProps like WalletPageProps since WalletPageProps is too generic can be misleading
// BoxProps is assumed to be a interface that created
interface WalletPageProps extends BoxProps {}

const WalletPage: React.FC<WalletPageProps> = (props: WalletPageProps) => {
  // Children are not used in this component, so we can remove it from the props
  // const { children, ...rest } = props;
  const { ...rest } = props;
  // Assume useWalletBalances and usePrices are custom hooks that fetch wallet balances and prices
  const balances: WalletBalance[] = useWalletBalances();
  const prices = usePrices();

  // Instead of using any for blockchain type, we can define a type for it
  const getPriority = (blockchain: BlockchainTypes): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // Missing declare type for sortedBalances with useMemo
  //   const sortedBalances = useMemo<WalletBalance[]>(() => {
  //     return balances
  //       .filter((balance: WalletBalance) => {
  //         const balancePriority = getPriority(balance.blockchain);
  //         // we do not have lhsPriority defined in this scope, so we should use balancePriority instead,
  //         // Shouldn't use two if statements here, we can combine them into one
  //         // if (lhsPriority > -99) {
  //         //   if (balance.amount <= 0) {
  //         //     return true;
  //         //   }
  //         // }

  //         if (balancePriority > -99 && balance.amount > 0) {
  //           return true;
  //         }

  //         return false;
  //       })
  //       .sort((lhs: WalletBalance, rhs: WalletBalance) => {
  //         const leftPriority = getPriority(lhs.blockchain);
  //         const rightPriority = getPriority(rhs.blockchain);
  //         if (leftPriority > rightPriority) {
  //           return -1;
  //         }
  //         // We can return 1 here instead of using else if
  //         return 1;
  //       });
  //     // For this memo we do not use prices, so we can remove it from the dependency array
  //     //   }, [balances, prices]);
  //   }, [balances]);

  // Since the formattedBalances is derived from sortedBalances, we can use useMemo to format the balances
  // Or we do not need to have 2 separate arrays, we can format the balances directly in the map function so we will have only one array

  // create a function to get the USD value of the balance

  const getUsdValue = (balance: WalletBalance): number => {
    return prices[balance.currency] * balance.amount;
  };

  const formattedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return balances
      .map((item) => {
        const formattedItem: FormattedWalletBalance = {
          ...item,
          formatted: item.amount.toFixed(),
          priority: getPriority(item.blockchain), // Adding priority to the formatted balance
        };
        return formattedItem;
      })
      .filter((balance: FormattedWalletBalance) => {
        // we do not have lhsPriority defined in this scope, so we should use balancePriority instead,
        // Shouldn't use two if statements here, we can combine them into one and I assume that the balance.amount is setting wrong since it should more than 0 to be included
        // if (lhsPriority > -99) {
        //   if (balance.amount <= 0) {
        //     return true;
        //   }
        // }

        return balance.priority > -99 && balance.amount > 0;
      })

      .sort((lhs: FormattedWalletBalance, rhs: FormattedWalletBalance) => {
        // This may be not efficent to call it like this since it is called for each comparison,
        // we can store the result in a variable and use it in the comparison after we map it
        // const leftPriority = getPriority(lhs.blockchain);
        // const rightPriority = getPriority(rhs.blockchain);
        // if (leftPriority > rightPriority) {
        //   return -1;
        // }
        // We can return if a > b to make it simpler for sorting in descending order:
        return rhs.priority - lhs.priority;
      });
    // For this memo we do not use prices, so we can remove it from the dependency array
    //   }, [balances, prices]);
  }, [balances]);

  // We should use formattedBalances instead of sortedBalances here
  // since we already sorted and formatted the balances, also useMemo to avoid unnecessary re-renders
  const rows = useMemo(
    () =>
      formattedBalances.map(
        (balance: FormattedWalletBalance, index: number) => {
          return (
            // Assuming WalletRow is a component that takes these props
            <WalletRow
              // We do not have classes defined in this example
              className={classes.row}
              // Index shouldnt be used as key, but for simplicity in this example
              // we will use it. In a real application, a unique identifier should be used.
              key={index}
              amount={balance.amount}
              usdValue={getUsdValue(balance)}
              formattedAmount={balance.formatted}
            />
          );
        }
      ),
    [formattedBalances, prices]
  );

  return <div {...rest}>{rows}</div>;
};
